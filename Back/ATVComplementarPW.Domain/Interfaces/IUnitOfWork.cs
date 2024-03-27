namespace ATVComplementarPW.Domain.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IPassengerRepository PassengerRepository { get; }
    IDriverRepository DriverRepository { get; }
    IVehicleRepository VehicleRepository { get; }
    ITransportRepository TransportRepository { get; }
    IReportsRepository ReportsRepository { get; }
    Task<bool> SaveChangesAsync();
}
