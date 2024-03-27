using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Exceptions;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using AutoMapper;

namespace ATVComplementarPW.Application.Services;

public class DriverService : IDriverService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public DriverService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<PageList<DriverDto>> GetAll(PageParams pageParams)
    {
        var driverPage = await _unitOfWork.DriverRepository.GetAll(pageParams);
        if (driverPage == null) return null;
        var driverPageDtos = _mapper.Map<IEnumerable<DriverDto>>(driverPage.Items);
        return new PageList<DriverDto>(driverPageDtos.ToList(), driverPage.TotalCount, driverPage.CurrentPage, driverPage.PageSize);
    }

    public async Task<DriverDto> GetById(int id)
    {
        Driver driver = await _unitOfWork.DriverRepository.GetById(id);
        return _mapper.Map<DriverDto>(driver);
    }

    public async Task<DriverDto> Create(DriverDto model)
    {
        Driver driver = await _unitOfWork.DriverRepository.GetByCPF(model.CPF);
        if (driver is not null)
        {
            throw new ATVComplementarPWException("CPF já cadastrado");
        }
        driver = _mapper.Map<Driver>(model);
        _unitOfWork.DriverRepository.Add(driver);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<DriverDto>(driver);
    }

    public async Task<DriverDto> Update(DriverDto model)
    {
        Driver driverCpf = await _unitOfWork.DriverRepository.GetByCPF(model.CPF);
        if(driverCpf is not null)
        {
            throw new ATVComplementarPWException("CPF já cadastrado");
        }
        Driver driver = await _unitOfWork.DriverRepository.GetById(model.Id);
        if (driver is null)
        {
            throw new ATVComplementarPWException("Motorista não cadastrado");
        }
        driver = _mapper.Map<Driver>(model);
        _unitOfWork.DriverRepository.Update(driver);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<DriverDto>(driver);
    }
    public async Task<DriverDto> Delete(int id)
    {
        Driver driver = await _unitOfWork.DriverRepository.GetById(id);
        if (driver is null)
        {
            throw new ATVComplementarPWException("Motorista não cadastrado");
        }
        driver.SetActive(false);
        _unitOfWork.DriverRepository.Update(driver);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<DriverDto>(driver);
    }
}
