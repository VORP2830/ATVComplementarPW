using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Domain.Interfaces;

public interface IDriverRepository : IGenericRepository<Driver>
{
    Task<PageList<Driver>> GetAll(PageParams pageParams);
    Task<Driver> GetByCPF(string cpf);
    Task<Driver> GetById(int id);
}
