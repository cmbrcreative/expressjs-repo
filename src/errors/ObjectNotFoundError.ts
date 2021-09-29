import { CustomError } from "ts-custom-error";

/**
 * Custom error thrown when an object or entity was
 * not able to be located or fetched.
 */
export class ObjectNotFoundError extends CustomError {
  /**
   * Creates an `ObjectNotFoundError` instance.
   * @param message The optional error message.
   */
  public constructor(message?: string) {
    super(message);
  }
}
