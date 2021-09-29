import "reflect-metadata";
import { exit } from "process";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import sslRedirect from "heroku-ssl-redirect";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import initDatabase from "src/loaders/database";

import { customErrorHandler } from "src/middleware/customErrorHandler";

async function startServer() {
  const PORT = process.env.PORT || 8080;

  try {
    // Setup the DB connection
    await initDatabase();
  } catch (error) {
    console.error(error);
    exit(1);
  }

  const app = express();
  app.use(sslRedirect());

  Sentry.init({
    dsn: process.env.SENTRY_DSN || "",
    environment: process.env.SENTRY_ENVIRONMENT || "",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Express API",
        version: "0.0.1",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["src/route/api/*.ts"],
  };

  const openapiSpecification = swaggerJsdoc(options);

  app.use("/", swaggerUi.serve);
  app.get("/", swaggerUi.setup(openapiSpecification));

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // Register default error handler
  app.use(customErrorHandler);

  app.listen(PORT, () => console.log("port " + PORT));
}

startServer();
