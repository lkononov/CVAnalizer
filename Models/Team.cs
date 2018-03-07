using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Team
    {
        public Team()
        {
            Candidate = new HashSet<Candidate>();
            Project = new HashSet<Project>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Candidate> Candidate { get; set; }
        public ICollection<Project> Project { get; set; }
    }
}
