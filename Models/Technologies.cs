using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Technologies
    {
        public Technologies()
        {
            Skills = new HashSet<Skills>();
        }

        public string Name { get; set; }
        public int Category { get; set; }
        public int Tid { get; set; }

        public ICollection<Skills> Skills { get; set; }
    }
}
