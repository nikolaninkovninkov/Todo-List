/**
 * @description Data that comes in from the client
 * @property email - Email of the user
 * @property password - Password of the user, not hashed
 * @property name - Name of the user
 * @property username - Username of the user
 */
export default interface RegisterData {
  email: string;
  username: string;
  name: string;
  password: string;
}
