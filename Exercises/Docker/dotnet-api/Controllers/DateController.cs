using System;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DateController : ControllerBase
    {
        private readonly ILogger<DateController> _logger;
        private readonly ApiOptions _apiOptions;

        public DateController(IOptionsSnapshot<ApiOptions> apiOptions, ILogger<DateController> logger)
        {
            _logger = logger;
            _apiOptions = apiOptions.Value;
        }
        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogTrace("[{Now}] - Trace log from GET date", DateTime.Now);
            return Ok($"[{DateTime.Now}] - {_apiOptions.Message} from {Environment.GetEnvironmentVariable("HOSTNAME")}");
        }
    }
}