namespace ATVComplementarPW.Application.Dtos;

public class TransportDto : BaseEntity
{
    public string VehiclePlate { get; set; }
    public string PassengerCpf { get; set; }
    public PassengerDto? Passenger { get; set; }
    public VehicleDto? Vehicle { get; set; }
    public string DateHourTransport { get; set; }
    public double TransportKm { get; set; }
    public double? Price { get; set; }
    public TransportDto() { }

    public TransportDto(int id, string vehiclePlate, string passengerCpf, DateTime dateHourTransport, double transportKm, double price)
    {
        Id = id;
        VehiclePlate = vehiclePlate;
        PassengerCpf = passengerCpf;
        DateHourTransport = dateHourTransport.ToString();
        TransportKm = transportKm;
        Price = price;
    }
}

