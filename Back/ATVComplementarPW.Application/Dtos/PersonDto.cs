namespace ATVComplementarPW.Application.Dtos;

public class PersonDto : BaseEntity
{
    public string Name { get; set; }
    public string DateOfBirth { get; set; }
    public string CPF { get; set; }
    public AddressDto? Address { get; set; }
}
