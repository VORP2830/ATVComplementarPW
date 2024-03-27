using AutoMapper;
using ATVComplementarPW.Domain.Entities;

namespace ATVComplementarPW.Application.Dtos.Mapping;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Address, AddressDto>().ReverseMap();
        CreateMap<Driver, DriverDto>().ReverseMap();
        CreateMap<Passenger, PassengerDto>().ReverseMap();
        CreateMap<Transport, TransportDto>().ReverseMap();
        CreateMap<Vehicle, VehicleDto>().ReverseMap();
    }
}
