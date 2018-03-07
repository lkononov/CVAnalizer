using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Skills
    {
        public Skills()
        {
            Candidate = new HashSet<Candidate>();
        }

        public int Id { get; set; }
        public int ObjectO { get; set; }
        public int Front { get; set; }
        public int Rel { get; set; }

        public Front FrontNavigation { get; set; }
        public ObjectO ObjectONavigation { get; set; }
        public Rel RelNavigation { get; set; }
        public ICollection<Candidate> Candidate { get; set; }
    }
}
