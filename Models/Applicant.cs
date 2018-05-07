using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Applicant
    {
        public Applicant()
        {
            Skills = new HashSet<Skills>();
        }

        public string Name { get; set; }
        public string SerName { get; set; }
        public int Team { get; set; }
        public string Portfolio { get; set; }
        public int Uid { get; set; }
        public string Spec { get; set; }
        public int? Age { get; set; }
        public string Position { get; set; }
        public int? Location { get; set; }

        public Location LocationNavigation { get; set; }
        public ICollection<Skills> Skills { get; set; }
    }
}
