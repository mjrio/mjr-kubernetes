using System;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace dotnet_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DateController : ControllerBase
    {
        private readonly ApiOptions _apiOptions;

        public DateController(IOptionsSnapshot<ApiOptions> apiOptions)
        {
            _apiOptions = apiOptions.Value;
        }
        [HttpGet]
        public IActionResult Get() 
            => Ok($"[{DateTime.Now}] - {_apiOptions.Message} from dotnet app");

        [HttpGet]
        public IActionResult Unhealthy() 
            => BadRequest($"[{DateTime.Now}] - Something very bad happened");
    }
}