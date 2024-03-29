namespace ATVComplementarPW.Domain.Entities;

public class Transport : BaseEntity
{
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    public int PassengerId { get; set; }
    public Passenger Passenger { get; set; }
    public DateTime DateHourTransport { get; set; }
    public double TransportKm { get; set; }
    public double Price { get; protected set; }
    protected Transport()
    {
        Price = 0.4 * TransportKm;
        Active = true;
    }
    public Transport(int vehicleId, int passengerId, DateTime dateHourTransport, double transportKm)
    {
        VehicleId = vehicleId;
        PassengerId = passengerId;
        DateHourTransport = dateHourTransport;
        TransportKm = transportKm;
        Price = transportKm * 0.4;
        Active = true;
    }
}

