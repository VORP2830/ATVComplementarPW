import { Passenger } from "./passenger";
import { Vehicle } from "./vehicle";

export interface Transport {
  id: number;
  vehiclePlate: string;
  passengerCpf: string;
  dateHourTransport: string;
  transportKm: number;
  passenger?: Passenger;
  vehicle?: Vehicle;
}
