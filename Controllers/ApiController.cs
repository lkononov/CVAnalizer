using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CVanalizer.Controllers
{
    [Route("api/Api")]
    public class ApiController : Controller
    {
        [HttpPost]
        public IActionResult Login([FromBody]Login login)
        {
            var x = login.username;
            var y = login.password;
            return Ok(login);
        }
        //[HttpPost]
        //public IActionResult Registration([FromBody]Login login)
        //{
        //    var lo = login;
        //    return Ok(login);
        //}
    }

    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}