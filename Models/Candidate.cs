using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Candidate
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Sname { get; set; }
        public int? Skill { get; set; }
        public int? Team { get; set; }
        public string Portfolio { get; set; }

        public Skills SkillNavigation { get; set; }
        public Team TeamNavigation { get; set; }
    }
}
