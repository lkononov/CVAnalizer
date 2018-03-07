using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Rel
    {
        public Rel()
        {
            Skills = new HashSet<Skills>();
        }

        public int Id { get; set; }
        public int? Php { get; set; }
        public int? Go { get; set; }
        public int? Pascal { get; set; }

        public ICollection<Skills> Skills { get; set; }
    }
}
