namespace ATVComplementarPW.Domain.Entities;

public class Transport : BaseEntity
{
    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; }
    public int DriverId { get; set; }
    public Driver Driver { get; set; }
    public int PassengerId { get; set; }
    public Passenger Passenger { get; set; }
    public DateOnly DateTransport { get; set; }
    public double TransportKm { get; set; }
    protected double Price { get; set; }
    protected Transport()
    {
        Price = 0.4 * TransportKm;
    }
}
