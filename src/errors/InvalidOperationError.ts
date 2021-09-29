import { CustomError } from "ts-custom-error";

/**
 * Custom error thrown when an operation failed due
 * to an unexpected error.
 */
export class InvalidOperationError extends CustomError {
  /**
   * Creates an `InvalidOperationError` instance.
   * @param message The optional error message.
   */
  public constructor(message?: string) {
    super(message);
  }
}
