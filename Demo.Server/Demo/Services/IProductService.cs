using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts();
        Product GetProductById(int id);
        Product AddProduct(Product product);
        Product UpdateProduct(Product product,int id);
        bool DeleteProduct(int id);
        List<Product> SearchProduct(string keyword);
    }
}
