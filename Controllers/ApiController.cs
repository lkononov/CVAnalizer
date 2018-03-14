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
        cvanalizerContext db = new cvanalizerContext();

        [Authorize]
        [HttpPost]
        public ActionResult GetCandidates()
        {
            List<Candidate> cands = db.Candidate.ToList(); 

            return Json(cands);
        }
    }
}