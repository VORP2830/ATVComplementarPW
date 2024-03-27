namespace ATVComplementarPW.Application.Dtos;

public class UserDto : PersonDto
{
    public string Login { get; set; }
    public string? Password { get; set; }
}
