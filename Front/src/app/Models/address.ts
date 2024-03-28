export interface Address {
  id: number;
  streetAvenue: string;
  district: string;
  zipCode: string;
  number?: number;
  complement?: string;
  state: string;
  city: string;
}
