namespace ATVComplementarPW.Application.Dtos;

public class TransportCreateDto : BaseEntity
{
    public string VehiclePlate { get; set; }
    public string PassengerCPF { get; set; }
    public PassengerDto? Passenger { get; set; }
    public DateTime DateHourTransport { get; set; }
    public double TransportKm { get; set; }
}
