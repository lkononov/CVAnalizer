using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Team { get; set; }

        public Team TeamNavigation { get; set; }
    }
}
