using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Domain.Interfaces;

public interface IVehicleRepository : IGenericRepository<Vehicle>
{
    Task<PageList<Vehicle>> GetAll(PageParams pageParams);
    Task<Vehicle> GetByPlate(string plate);
    Task<Vehicle> GetById(int id);
}
