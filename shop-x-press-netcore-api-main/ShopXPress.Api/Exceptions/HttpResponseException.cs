using System.Net;

namespace ShopXPress.Api.Exceptions;

public class HttpResponseException : Exception {

    public HttpResponseException(ErrorType errorType) {
        ErrorType = errorType;
    }

    public HttpResponseException(ErrorType errorType, string? message = null, object? additionValue = null, int status = (int)HttpStatusCode.BadRequest) : base(message) {
        ErrorType = errorType;
        Status = status;
        AdditionValue = additionValue;
    }

    public object? AdditionValue { get; set; }
    public ErrorType ErrorType { get; set; }
    public int Status { get; set; } = (int)HttpStatusCode.BadRequest;
}

public enum ErrorType {
    Validation,
    Operation
}
