using System;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly ApiOptions _apiOptions;

        public ApiController(IOptionsSnapshot<ApiOptions> apiOptions)
        {
            _apiOptions = apiOptions.Value;
        }
        [HttpGet]
        public IActionResult Get() 
            => Ok($"[{DateTime.Now}] - {_apiOptions.Message} from dotnet app ");
    }
}