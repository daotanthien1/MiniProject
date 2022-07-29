using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Models
{
    public class AuthenticatedResponse
    {
        public string? Token { get; set; }
        public string Username { get; set; }
    }
}
