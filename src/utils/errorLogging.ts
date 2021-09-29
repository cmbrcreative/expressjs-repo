import * as Sentry from "@sentry/node";

/**
 * Logs an application error.
 * @returns The Sentry generated event ID.
 */
export default function logError(error: Error): string {
  console.error(error);
  return Sentry.captureException(error);
}
