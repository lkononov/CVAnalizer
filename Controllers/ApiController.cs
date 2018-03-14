using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVanalizer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CVanalizer.Controllers
{
    [Route("[controller]/[action]")]
    public class ApiController : Controller
    {
       
        [HttpPost,Authorize]
        public async Task<bool> Test()
        {
            await Task.Delay(1);
            return true;
        }
        //Password hashing
    }
}