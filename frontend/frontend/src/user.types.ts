import {date} from "yup";

export default interface IUser {
    id?: any | null,
    name: string,
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

export interface stateType{
    isLoggedIn: boolean,
    user?: IUser
}

export interface IAuthor {
    id:number,
    firstName: string,
    lastName: string,
    birthDate: Date,
}

export interface IBook {
    id: number,
    title: string,
    isbn: number,
    totalPages: number,
    pablishedDate: Date,
    authors: IAuthor[]
}

