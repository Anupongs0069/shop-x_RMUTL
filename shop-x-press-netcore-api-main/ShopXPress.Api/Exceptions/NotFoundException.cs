namespace ShopXPress.Api.Exceptions;

public class NotFoundException : HttpResponseException
{
    public NotFoundException(string message = "Not Found", object? additionValue = null) : base(ErrorType.Operation, message, additionValue, (int)System.Net.HttpStatusCode.NotFound)
    {
    }
}
