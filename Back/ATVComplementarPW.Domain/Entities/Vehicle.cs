using ATVComplementarPW.Domain.Enum;

namespace ATVComplementarPW.Domain.Entities;

public class Vehicle : BaseEntity
{
    public VehicleType VehicleType { get; set; }
    public string Plate { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Year { get; set; }
    public int Capacity { get; set; }
    public int DriverId { get; set; }
    public Driver Driver { get; set; }
    protected Vehicle() 
    {
        Active = true;
    }
}
