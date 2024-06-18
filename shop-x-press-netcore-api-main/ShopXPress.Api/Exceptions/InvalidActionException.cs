namespace ShopXPress.Api.Exceptions;

public class InvalidActionException : HttpResponseException
{
    public InvalidActionException(string message, object? additionValues = null) : base(ErrorType.Operation, message, additionValues)
    {
    }
}
