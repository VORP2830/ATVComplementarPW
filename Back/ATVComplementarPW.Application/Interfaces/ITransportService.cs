using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Application.Interfaces;

public interface ITransportService
{
    Task<PageList<TransportDto>> GetAll(PageParams pageParams);
    Task<TransportDto> GetById(int id);
    Task<TransportDto> Create(TransportDto model);
    Task<TransportDto> Update(TransportDto model);
    Task<TransportDto> Delete(int id);
}
