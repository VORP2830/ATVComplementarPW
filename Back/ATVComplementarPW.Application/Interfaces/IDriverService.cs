using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Application.Interfaces;

public interface IDriverService
{
    Task<PageList<DriverDto>> GetAll(PageParams pageParams);
    Task<DriverDto> GetById(int id);
    Task<DriverDto> Create(DriverDto model);
    Task<DriverDto> Update(DriverDto model);
    Task<DriverDto> Delete(int id);
}
