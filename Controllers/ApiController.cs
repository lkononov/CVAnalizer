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
    
    public class ApiController : Controller
    {
        cvanalizerContext db = new cvanalizerContext();

        [Authorize]
        [HttpPost]
        public IActionResult GetCandidates([FromBody]TName name)
        {

            //var appl = db.Applicant.ToList();
            //var skill = db.Skills.ToList();
            //var tech = db.Technologies.ToList();
            //var clist = new List<IList>();


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

            //foreach(var uid in Candidate)
            //{
            //    var Applicants = (from t in db.Technologies
            //                     join s in db.Skills
            //                     on t.Tid equals s.Tid
            //                     join a in db.Applicant
            //                     on s.Uid equals a.Uid
            //                     select new
            //                     {
            //                         uid = a.Uid,
            //                         uname = a.Name,
            //                         suname = a.SerName,
            //                         portfolio = a.Portfolio,

            //                         exp = s.Experience,

            //                         tname = t.Name,
            //                         tgroup = t.Category,
            //                         tid = t.Tid
            //                     }
            //                      ).ToList();
            //}
            //j.Add(Candidate);
            return Json(Candidate);
        }
        public class TName
        {
            public string tname { get; set; }
        }
    }
}