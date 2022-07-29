using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Services
{
  public interface IAuthService
  {
      Task<bool> Register(Register model);
      Task<AuthenticatedResponse> Login(Login model);
    
  }
}
