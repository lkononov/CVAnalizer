using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Front
    {
        public Front()
        {
            Skills = new HashSet<Skills>();
        }

        public int Id { get; set; }
        public int? React { get; set; }
        public int? Angular { get; set; }
        public int? JQuery { get; set; }

        public ICollection<Skills> Skills { get; set; }
    }
}
