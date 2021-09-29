import { CustomError } from "ts-custom-error";

/**
 * Custom error thrown when one of the arguments provided
 * to a method is not valid.
 */
export class InvalidArgumentError extends CustomError {
  /**
   * Creates an `InvalidArgumentError` instance.
   * @param paramName The argument or parameter name.
   * @param message The optional error message.
   */
  public constructor(public paramName: string, message?: string) {
    super(message);
  }

  public toString(): string {
    return `${this.paramName} - ${this.message}`;
  }
}

/**
 * Custom error thrown when a null reference is passed to a
 * method that does not accept it as a valid argument.
 */
export class ArgumentNullError extends InvalidArgumentError {
  /**
   * Creates an `ArgumentNullError` instance.
   * @param paramName The argument or parameter name.
   */
  public constructor(public paramName: string) {
    super(paramName, "cannot be null or undefined");
  }
}
