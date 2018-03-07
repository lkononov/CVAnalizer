using System;
using System.Collections.Generic;

namespace CVanalizer.Models
{
    public partial class Users
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string PasswordH { get; set; }
        public bool IsAdmin { get; set; }
    }
}
