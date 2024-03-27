using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Application.Interfaces;

public interface IVehicleService
{
    Task<PageList<VehicleDto>> GetAll(PageParams pageParams);
    Task<VehicleDto> GetById(int id);
    Task<VehicleDto> Create(VehicleDto model);
    Task<VehicleDto> Update(VehicleDto model);
    Task<VehicleDto> Delete(int id);
}
