import { CustomError } from "ts-custom-error";

/**
 * Custom error thrown when an operation could not
 * be completed due to insufficient priviledges or
 * permissions.
 */
export class OperationNotPermittedError extends CustomError {
  /**
   * Creates an `OperationNotPermittedError` instance.
   * @param message The optional error message.
   */
  public constructor(message?: string) {
    super(message);
  }
}
