export default interface IUser {
    id?: any | null,
    username: string,
    email: string,
    password: string,
    roles?: Array<string>
}
export interface IUserInfoResponse {
   token: string,
   type: string,
   username: string,
   roles?: Array<string>
}