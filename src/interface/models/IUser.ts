export interface IUser {
  /**
   * The user's identifier
   */
  id: string;

  /**
   * The user's identifier in the IdP (if applicable)
   */
  uid: string;

  /**
   * Date when the user object was created.
   */
  created_at: Date;
}
