using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using CVanalizer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
                             join l in db.Location
                             on a.Location equals l.Id
                             select new
                             {
                                 uid = a.Uid,
                                 uName = a.Name,
                                 suName = a.SerName,
                                 portfolio = a.Portfolio,
                                 Location = l.Lname,
                                 Age = a.Age,
                                 Pos = a.Position,
                                 Spec = a.Spec,
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
        [HttpPost]
        public IActionResult UpdateTechnologies([FromBody]Technos techs)
        {

            if (ModelState.IsValid)
            {
                for (int i = 0; i < techs.NewTechStack.Length; i++)
                {
                    var Skills = db.Skills;
                    Skills.Add(new Skills { Tid = techs.NewTechStack[i].tid, Uid = techs.NewTechStack[i].uid, Experience = techs.NewTechStack[i].exp, Ready = true });
                }
                db.SaveChanges();
            }
            else
            {
                return BadRequest(ModelState);
            }

            return Ok();
        }
        public class TName
        {
            public string tname { get; set; }
        }
        public class Technos
        {
            public GetTechs[] NewTechStack { get; set; }

        }

        public class GetTechs
        {
            public int uid { get; set; }
            public int tid { get; set; }
            public int exp { get; set; }
        }
    }
}