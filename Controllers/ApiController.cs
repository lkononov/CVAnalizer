using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CVanalizer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace CVanalizer.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class ApiController : Controller
    {
        cvanalizerContext db = new cvanalizerContext();

        [HttpPost]
        public IActionResult GetCandidates([FromBody]TName name)
        {
            var Candidate = (from t in db.Technologies
                             join s in db.Skills
                             on t.Tid equals s.Tid
                             join a in db.Applicant
                             on s.Uid equals a.Uid
                             select new
                             {
                                 uid = a.Uid,
                                 uName = a.Name,
                                 suName = a.SerName,
                                 portfolio = a.Portfolio,

                                 exp = s.Experience,

                                 tName = t.Name,
                                 tGroup = t.Category,
                                 tId = t.Tid
                             }
                              ).ToArray();

            return Json(Candidate);
        }
       
        [HttpPost]
        public IActionResult GetTechnologies([FromBody]TName name)
        {
            var technologies = db.Technologies.ToList();
            
            return Json(technologies);
        }

        public class TName
        {
            public string tname { get; set; }
        }
    }
}