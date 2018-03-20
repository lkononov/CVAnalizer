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
            var Candidate = (from c in db.Candidate
                              join p in db.Project
                              on c.Team equals p.Team
                              join o in db.ObjectO
                              on c.Skill equals o.Id
                              join r in db.Rel
                              on c.Skill equals r.Id
                              join f in db.Front
                              on c.Skill equals f.Id
                              join t in db.Team
                              on c.Team equals t.Id
                              select new
                                  {
                                    id = c.Id,
                                    name = c.Name,
                                    sname = c.Sname,
                                    cisharp = o.C,
                                    java = o.Java,
                                    piton = o.Python,
                                    php = r.Php,
                                    pascal = r.Pascal,
                                    go = r.Go,
                                    react = f.React,
                                    jquery = f.JQuery,
                                    angular = f.Angular,
                                    project = p.Name,
                                    team = t.Name,
                                  }
                              ).ToList();
            return Json(Candidate);
        }
    }
}