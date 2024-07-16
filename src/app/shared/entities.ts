export interface ICredentials {
    username: string;
    password: string;
}

export interface IToken {
    token: string;
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

export interface itemsInterface {
    id: number;
    name: string;
    price: number;
    image: string;
    category: {
        id:number;
        name:string;
    }
}

export interface categoryInterface{
    id: number;
    name: string;
    description: string;
    image:string;
}

export interface serviceInterface{
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}