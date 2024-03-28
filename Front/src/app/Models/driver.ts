import { Address } from "./address";

export interface Driver {
  id: number;
  name: string;
  dateOfBirth: string;
  cpf: string;
  address: Address;
}
