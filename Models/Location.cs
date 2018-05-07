using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Location
    {
        public Location()
        {
            Applicant = new HashSet<Applicant>();
        }

        public int Id { get; set; }
        public string Lname { get; set; }

        public ICollection<Applicant> Applicant { get; set; }
    }
}
