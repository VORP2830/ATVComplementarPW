import { Address } from "./address";

export interface User {
  id: number;
  name: string;
  dateOfBirth: Date;
  login: string;
  password?: string;
  cpf: string;
  address: Address
}
