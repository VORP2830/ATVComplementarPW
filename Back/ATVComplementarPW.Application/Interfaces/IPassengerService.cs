using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Application.Interfaces;

public interface IPassengerService
{
    Task<PageList<PassengerDto>> GetAll(PageParams pageParams);
    Task<PassengerDto> GetById(int id);
    Task<PassengerDto> Create(PassengerDto model);
    Task<PassengerDto> Update(PassengerDto model);
    Task<PassengerDto> Delete(int id);
}
