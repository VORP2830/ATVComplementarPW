using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Domain.Interfaces;

public interface ITransportRepository : IGenericRepository<Transport>
{
    Task<PageList<Transport>> GetAll(PageParams pageParams);
    Task<Transport> GetById(int id);
}
