using Demo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userMananger;
        public IConfiguration _configuration;
        public AuthService(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userMananger = userManager;
            _configuration = configuration;
        }
        public async Task<AuthenticatedResponse> Login(Login model)
        {
            var loginResult = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
            if (loginResult.Succeeded)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44315",
                    audience: "https://localhost:44315",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new AuthenticatedResponse {Token = tokenString, Username = model.Username };
            }
            return null;
        }

        public async Task<bool> Register(Register model)
        {
            var user = new IdentityUser()
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _userMananger.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return true;
            }
            return false;
        }
    }
}
