/**
 * @description User that is being passed from middleware auth to the next. Contains only the MongoID of the user
 */
export default interface RequestUser {
  _id: string;
}
