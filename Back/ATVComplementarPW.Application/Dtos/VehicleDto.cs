namespace ATVComplementarPW.Application.Dtos;

public class VehicleDto : BaseEntity
{
    public string VehicleType { get; set; }
    public string Plate { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public string Year { get; set; }
    public int Capacity { get; set; }
    public string DriverCPF{ get; set; }
    public DriverDto? Driver { get; set; }
}
