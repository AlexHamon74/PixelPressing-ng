export interface ICredentials {
    username: string;
    password: string;
}
export interface IUser {
    email:string;
    password:string;
    name:string;
    firstname:string;
    gender:string;
    adress:string;
    birthdate:string;
}
  
export interface IToken {
    token: string;
}

export interface itemsInterface{
    id: number;
    name: string;
    category: string;
    price: number;
    image:string;
}