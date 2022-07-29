using Demo.Data;
using Demo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Services
{
  public class ProductService : IProductService
  {
    private readonly DemoDbContext _context;

    public ProductService(DemoDbContext context)
    {
      _context = context;
    }
    public IEnumerable<Product> GetProducts()
    {
      return _context.Products.ToList();
    }
    public Product AddProduct(Product product)
    {
      _context.Products.Add(product);
      _context.SaveChanges();
      return product;
    }

    public Product GetProductById(int id)
    {
      return _context.Products.Find(id);
    }
    public Product UpdateProduct(Product product,int id)
    {
      var ProductUpd = _context.Products.Find(id);
      ProductUpd.ProductName = product.ProductName;
      ProductUpd.Price = product.Price;
      ProductUpd.ImageUrl = product.ImageUrl;
      ProductUpd.Description = product.Description;
      _context.SaveChanges();
      return ProductUpd;
    }

    public bool DeleteProduct(int id)
    {
      if(id != 0)
      {
        var ProductUpd = _context.Products.Find(id);
        _context.Products.Remove(ProductUpd);
        _context.SaveChanges();
        return true;
      }
      return false;
      
    }

        public List<Product> SearchProduct(string keyword)
        {
            var result = _context.Products.Select(x => x);
            
            if (!string.IsNullOrEmpty(keyword))
            {
                result = result.Where(x => x.Id.ToString().Equals(keyword)
                                     || x.Description.Contains(keyword)
                                     || x.ProductName.Contains(keyword)
                                     || x.Price.ToString().Contains(keyword));
                
                return result.ToList();
            }
            else
            {
                return result.ToList();
            }
            
        }
    }
}
