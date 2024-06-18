using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ShopXPress.Api.Exceptions;

namespace ShopXPress.Api.Filters;

public class HttpResponseExceptionFilter : IActionFilter
{
    private readonly IHostEnvironment _hostEnvironment;
    private readonly ILogger<HttpResponseExceptionFilter> _logger;

    public HttpResponseExceptionFilter(IHostEnvironment hostEnvironment, ILogger<HttpResponseExceptionFilter> logger)
    {
        _hostEnvironment = hostEnvironment;
        _logger = logger;
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.Exception != null)
        {
            //var logService = context.HttpContext.RequestServices.GetService(typeof(ILogService)) as ILogService;
            if (context.Exception is HttpResponseException exception)
            {
                // construct properties that need to expose to the response
                var val = new
                {
                    exception.Message,
                    exception.Status,
                    exception.ErrorType,
                    exception.AdditionValue
                };
                context.Result = new ObjectResult(val)
                {
                    StatusCode = exception.Status
                };
                context.ExceptionHandled = true;
                // Write log with information level for handled exception
                //logService.Write(LogType.Information, "API", context.HttpContext.Request.Path, exception);
                _logger.LogError(exception, $"API : Error from {context.HttpContext.Request.Path}");
            }
            else
            {
                var val = new
                {
                    context.Exception.Message
                };
                context.Result = new ObjectResult(val)
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                };
                context.ExceptionHandled = true;

                // Write log with error level for unhandled exception
                //logService.Write(LogType.Error, "API", context.HttpContext.Request.Path, context.Exception);
                _logger.LogError(context.Exception, $"API : Error from {context.HttpContext.Request.Path}");
#if DEBUG
                // throw context.Exception;
#endif
            }
        }
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
    }
}
