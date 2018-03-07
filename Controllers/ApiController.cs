using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVanalizer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CVanalizer.Controllers
{
    [Route("[controller]/[action]")]
    public class ApiController : Controller
    {
        cvanalizerContext db = new cvanalizerContext();

        //Authorisation
        [HttpPost]
        public IActionResult Login([FromBody]Users model)
        {
            Users User = (from Users in db.Users
                          where Users.Login == model.Login
                          select Users).FirstOrDefault();
        
            if(User != null)
            {
                if(BCrypt.Net.BCrypt.Verify(model.PasswordH, User.PasswordH))
                {
                    return Ok("Auth Success");
                }
                else
                {
                    return Unauthorized();
                }           
            }
            return Unauthorized();
        }
        //Registration
        [HttpPost]
        public IActionResult Registration([FromBody]Users newUser)
        {            
            var PHash = HashPass(newUser.PasswordH);

            var AddUser = new Users { Id = Guid.NewGuid(), Login = newUser.Login , PasswordH = PHash, IsAdmin = false};

            db.Users.Add(AddUser);
            db.SaveChanges();
       
            return Ok(User);
        }

        //Password hashing
        public string HashPass(string password)
        {
            string PHash = BCrypt.Net.BCrypt.HashPassword(password);
            return PHash;
        }
    }
}