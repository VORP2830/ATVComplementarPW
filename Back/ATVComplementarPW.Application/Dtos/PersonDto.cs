namespace ATVComplementarPW.Application.Dtos;

public class PersonDto : BaseEntity
{
    public string Name { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string CPF { get; set; }
    public AddressDto? Address { get; set; }
}
