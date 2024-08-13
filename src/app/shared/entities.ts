export interface Credentials {
    username: string;
    password: string;
}

export interface Token {
    token: string;
}

export interface UserInterface {
    '@id': string;
    id: number;
    email:string;
    name:string;
    firstname:string;
    gender:string;
    adress:string;
    birthdate:string;
    roles: string[];
}

export interface ApiListResponse<T> {
    '@id': string;
    'hydra:totalItems': number;
    'hydra:member': T[];
}

export interface itemsInterface {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: categoryInterface;
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

export interface cartItemInterface{
    id: number;
    item: itemsInterface;
    service: serviceInterface[];
    quantity: number;
    totalPrice: number; 
}

export interface orderInterface{
    id?: number;
    price:number;
    status: string;
    delivery:boolean;
    deliveryDate:string |null;
    commandItems:cartItemInterface[];
    createdAt: string;
    user: string;
}