using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Pagination;

namespace ATVComplementarPW.Domain.Interfaces;

public interface IPassengerRepository : IGenericRepository<Passenger>
{
    Task<PageList<Passenger>> GetAll(PageParams pageParams);
    Task<Passenger> GetByCPF(string cpf);
    Task<Passenger> GetById(int id);
}
