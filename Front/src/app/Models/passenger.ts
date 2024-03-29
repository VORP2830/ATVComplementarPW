import { Address } from "./address";

export interface Passenger {
    id: number;
    name: string;
    dateOfBirth: string;
    cpf: string;
    address: Address;
}
