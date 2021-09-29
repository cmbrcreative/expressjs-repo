import { CustomError } from "ts-custom-error";

/**
 * Defines an HTTP error response.
 */
interface IHttpErrorResponse {
  status: number;
  error_code: number;
  message: string;
  details: any;
}

/**
 * Defines an HTTP error.
 */
export class HttpError extends CustomError {
  /**
   * The HTTP response of this error.
   */
  readonly response: IHttpErrorResponse;

  /**
   * Creates an `HttpError` instance.
   * @param code The HTTP status code.
   * @param message The optional error message.
   * @param details The optional error details.
   */
  public constructor(
    public code: number,
    message?: string,
    public details?: any,
  ) {
    super(message);
    this.response = {
      status: this.code,
      error_code: undefined,
      message: this.message,
      details: this.details,
    };
  }
}
