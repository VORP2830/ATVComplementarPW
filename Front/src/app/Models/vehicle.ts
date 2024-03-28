import { User } from "./User";

export interface Vehicle {
  id: number;
  vehicleType: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  capacity: number;
  driverCPF: string;
  driver?: User;
}
