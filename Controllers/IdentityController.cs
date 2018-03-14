using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

using System.IdentityModel.Tokens.Jwt;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using CVanalizer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace PersonalPortal.Controllers
{
    [Route("[controller]/[action]")]
    public class IdentityController : Controller
    {
        cvanalizerContext db = new cvanalizerContext();
        private IConfiguration _config;

        public IdentityController(IConfiguration config)
        {
            _config = config;
        }       

        //Registration
        [HttpPost]
        public IActionResult Registration([FromBody]Users newUser)
        {
            var PHash = HashPass(newUser.PasswordH);
            var AddUser = new Users { Id = Guid.NewGuid(), Login = newUser.Login, PasswordH = PHash, IsAdmin = false };

            db.Users.Add(AddUser);
            db.SaveChanges();

            return Ok("success");
        }
        private string HashPass(string password)
        {
            string PHash = BCrypt.Net.BCrypt.HashPassword(password);
            return PHash;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]Users model)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(model);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private Users Authenticate(Users model)
        {
            Users user = null;
            Users User = (from Users in db.Users
                          where Users.Login == model.Login
                          select Users).FirstOrDefault();

            if (User != null)
            {
                if (BCrypt.Net.BCrypt.Verify(model.PasswordH, User.PasswordH))
                {
                    //Response.Cookies.Append("Id", User.Id.ToString());
                    user = User;
                    return user;
                }
            }
            return user;
        }

        private string BuildToken(Users user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(1),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}