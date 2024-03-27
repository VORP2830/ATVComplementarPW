namespace ATVComplementarPW.Application.Dtos;

public class TransportDto : BaseEntity
{
    public int VehicleId { get; set; }
    public VehicleDto Vehicle { get; set; }
    public int PassengerId { get; set; }
    public PassengerDto Passenger { get; set; }
    public DateTime DateHourTransport { get; set; }
    public double TransportKm { get; set; }
    protected double Price { get; set; }
}
