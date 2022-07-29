using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }

        [Column(TypeName = "decimal(10,3)")]
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
