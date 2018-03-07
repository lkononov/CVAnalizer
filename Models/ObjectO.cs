using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class ObjectO
    {
        public ObjectO()
        {
            Skills = new HashSet<Skills>();
        }

        public int Id { get; set; }
        public int? C { get; set; }
        public int? Java { get; set; }
        public int? Python { get; set; }

        public ICollection<Skills> Skills { get; set; }
    }
}
