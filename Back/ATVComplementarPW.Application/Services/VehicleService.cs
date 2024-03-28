using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Exceptions;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using AutoMapper;

namespace ATVComplementarPW.Application.Services;

public class VehicleService : IVehicleService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public VehicleService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }
    public async Task<PageList<VehicleDto>> GetAll(PageParams pageParams)
    {
        var vehiclePage = await _unitOfWork.VehicleRepository.GetAll(pageParams);
        if (vehiclePage == null) return null;
        var vehiclePageDtos = _mapper.Map<IEnumerable<VehicleDto>>(vehiclePage.Items);
        return new PageList<VehicleDto>(vehiclePageDtos.ToList(), vehiclePage.TotalCount, vehiclePage.CurrentPage, vehiclePage.PageSize);
    }

    public async Task<VehicleDto> GetById(int id)
    {
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetById(id);
        Driver driver = await _unitOfWork.DriverRepository.GetById(vehicle.DriverId);
        VehicleDto vehicleDto = _mapper.Map<VehicleDto>(vehicle);
        vehicleDto.DriverCPF = driver.CPF;
        return vehicleDto;
    }

    public async Task<VehicleDto> Create(VehicleDto model)
    {
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetByPlate(model.Plate);
        if (vehicle is not null)
        {
            throw new ATVComplementarPWException("Veiculo já cadastrado");
        }
        Driver driver = await _unitOfWork.DriverRepository.GetByCPF(model.DriverCPF);
        if (driver is null)
        {
            throw new ATVComplementarPWException("Motorista não cadastrado");
        }
        vehicle = new Vehicle(model.VehicleType, model.Plate, model.Brand, model.Model, model.Year, model.Capacity, driver.Id);
        _unitOfWork.VehicleRepository.Add(vehicle);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<VehicleDto>(vehicle);
    }

    public async Task<VehicleDto> Update(VehicleDto model)
    {
        Vehicle vehiclePlate = await _unitOfWork.VehicleRepository.GetByPlate(model.Plate);
        if (vehiclePlate.Id != model.Id)
        {
            throw new ATVComplementarPWException("Veiculo já cadastrado");
        }
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetById(model.Id);
        if (vehicle is null)
        {
            throw new ATVComplementarPWException("Veiculo não cadastrado");
        }
        Driver driver = await _unitOfWork.DriverRepository.GetByCPF(model.DriverCPF);
        if (driver is null)
        {
            throw new ATVComplementarPWException("Motorista não cadastrado");
        }
        vehicle = new Vehicle(model.Id, model.VehicleType, model.Plate, model.Brand, model.Model, model.Year, model.Capacity, driver.Id);
        _unitOfWork.VehicleRepository.Update(vehicle);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<VehicleDto>(vehicle);
    }
    public async Task<VehicleDto> Delete(int id)
    {
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetById(id);
        if (vehicle is null)
        {
            throw new ATVComplementarPWException("Veiculo não cadastrado");
        }
        vehicle.SetActive(false);
        _unitOfWork.VehicleRepository.Update(vehicle);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<VehicleDto>(vehicle);
    }
}
