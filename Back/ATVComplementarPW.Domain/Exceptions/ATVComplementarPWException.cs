namespace ATVComplementarPW.Domain.Exceptions;
public class ATVComplementarPWException : Exception
{
    public ATVComplementarPWException(string message) : base(message) { }
    public static void When(bool hasError, string error)
    {
        if (hasError)
        {
            throw new ATVComplementarPWException(error);
        }
    }
}
