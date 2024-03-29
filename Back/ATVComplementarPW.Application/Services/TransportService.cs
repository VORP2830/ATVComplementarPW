using ATVComplementarPW.Application.Dtos;
using ATVComplementarPW.Application.Interfaces;
using ATVComplementarPW.Domain.Entities;
using ATVComplementarPW.Domain.Exceptions;
using ATVComplementarPW.Domain.Interfaces;
using ATVComplementarPW.Domain.Pagination;
using AutoMapper;

namespace ATVComplementarPW.Application.Services;

public class TransportService : ITransportService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public TransportService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<PageList<TransportDto>> GetAll(PageParams pageParams)
    {
        var transportPage = await _unitOfWork.TransportRepository.GetAll(pageParams);
        if (transportPage == null) return null;
        var transportPageDtos = _mapper.Map<IEnumerable<TransportDto>>(transportPage.Items);
        return new PageList<TransportDto>(transportPageDtos.ToList(), transportPage.TotalCount, transportPage.CurrentPage, transportPage.PageSize);
    }

    public async Task<TransportDto> GetById(int id)
    {
        Transport transport = await _unitOfWork.TransportRepository.GetById(id);
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetById(transport.VehicleId);
        Passenger passenger = await _unitOfWork.PassengerRepository.GetById(transport.PassengerId);
        TransportDto transportDto = new TransportDto(transport.Id, vehicle.Plate, passenger.CPF, transport.DateHourTransport, transport.TransportKm, transport.Price);
        return transportDto;
    }

    public async Task<TransportDto> Create(TransportDto model)
    {
        Passenger passenger = await _unitOfWork.PassengerRepository.GetByCPF(model.PassengerCpf);
        if(passenger is null)
        {
            throw new ATVComplementarPWException("Passageiro não cadastrado");
        }
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetByPlate(model.VehiclePlate);
        if(vehicle is null)
        {
            throw new ATVComplementarPWException("Veiculo não cadastrado");
        }
        Transport transport = new Transport(vehicle.Id, passenger.Id, DateTime.Parse(model.DateHourTransport), model.TransportKm);
        _unitOfWork.TransportRepository.Add(transport);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TransportDto>(transport);
    }

    public async Task<TransportDto> Update(TransportDto model)
    {
        Transport transport = await _unitOfWork.TransportRepository.GetById(model.Id);
        if(transport is null)
        {
            throw new ATVComplementarPWException("Transporte não encontrado");
        }
        Passenger passenger = await _unitOfWork.PassengerRepository.GetByCPF(model.PassengerCpf);
        if(passenger is null)
        {
            throw new ATVComplementarPWException("Passageiro não cadastrado");
        }
        Vehicle vehicle = await _unitOfWork.VehicleRepository.GetByPlate(model.VehiclePlate);
        if(vehicle is null)
        {
            throw new ATVComplementarPWException("Veiculo não cadastrado");
        }
        transport = _mapper.Map<Transport>(model);
        _unitOfWork.TransportRepository.Update(transport);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TransportDto>(transport);
    }

    public async Task<TransportDto> Delete(int id)
    {
        Transport transport = await _unitOfWork.TransportRepository.GetById(id);
        if(transport is null)
        {
            throw new ATVComplementarPWException("");
        }
        transport.SetActive(false);
        _unitOfWork.TransportRepository.Update(transport);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TransportDto>(transport);
    }
}
