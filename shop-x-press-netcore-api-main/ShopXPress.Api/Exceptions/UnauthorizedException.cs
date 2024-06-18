namespace ShopXPress.Api.Exceptions;

public class UnauthorizedException : HttpResponseException {

    public UnauthorizedException(string message = "Unauthorized", object? additionValue = null) : base(ErrorType.Operation, message, additionValue, (int)System.Net.HttpStatusCode.Unauthorized) {
    }
}
