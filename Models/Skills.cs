using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Skills
    {
        public int Id { get; set; }
        public int Uid { get; set; }
        public int Tid { get; set; }
        public int Experience { get; set; }
        public bool Ready { get; set; }

        public Technologies T { get; set; }
        public Applicant U { get; set; }
    }
}
