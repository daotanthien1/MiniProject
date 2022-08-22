using Demo.Models;
using Demo.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login model)
        {
            var account = await _authService.Login(model);
            if (account != null)
            {
                return Ok(new AuthenticatedResponse { Token = account.Token , Username = account.Username});
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<bool> Register(Register model)
        {
            return await _authService.Register(model);
        }
    }
}
