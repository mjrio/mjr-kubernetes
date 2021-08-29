using System;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly IOptionsMonitor<ApiOptions> _apiOptions;

        public ApiController(IOptionsMonitor<ApiOptions> apiOptions)
        {
            _apiOptions = apiOptions;
        }
        [HttpGet]
        public IActionResult Get() 
            => Ok($"[{DateTime.Now}] - {_apiOptions.CurrentValue.Message} rom dotnet app ");
    }
}