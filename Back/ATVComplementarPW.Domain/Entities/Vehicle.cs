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
    public Vehicle(string vehicleType, string plate, string brand, string model, string year, int capacity, int driverId)
    {
        if(vehicleType == "Car")
        {
            VehicleType = VehicleType.Car;
        }
        else if(vehicleType == "Bus")
        {
            VehicleType = VehicleType.Bus;
        }
        else if(vehicleType == "VAN")
        {
            VehicleType = VehicleType.VAN;
        }
        Plate = plate;
        Brand = brand;
        Model = model;
        Year = year;
        Capacity = capacity;
        DriverId = driverId;
        Active = true;
    }
    public Vehicle(int id, string vehicleType, string plate, string brand, string model, string year, int capacity, int driverId)
    {
        Id = id;
        if(vehicleType == "Car")
        {
            VehicleType = VehicleType.Car;
        }
        else if(vehicleType == "Bus")
        {
            VehicleType = VehicleType.Bus;
        }
        else if(vehicleType == "VAN")
        {
            VehicleType = VehicleType.VAN;
        }
        Plate = plate;
        Brand = brand;
        Model = model;
        Year = year;
        Capacity = capacity;
        DriverId = driverId;
        Active = true;
    }
}
