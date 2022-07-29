using Demo.Models;
using Demo.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _productService.GetProducts();
        }

        [HttpGet("{id}")]
        public Product GetProductById(int id)
        {
            return _productService.GetProductById(id);
        }

        [HttpPost("create")]
        public Product AddProduct(Product product)
        {
            var param = new Product()
            {
                ProductName = product.ProductName,
                Price = product.Price,
                ImageUrl = product.ImageUrl,
                Description = product.Description
            };
            var result = _productService.AddProduct(param);
            return result;
        }

        [HttpPut("{id}")]
        public Product UpdateProduct(Product product, int id)
        {
            return _productService.UpdateProduct(product, id);
        }

        [HttpDelete("{id}")]
        public bool DeleteProduct(int id)
        {
            return _productService.DeleteProduct(id);
        }

        [HttpGet("search/{keyword}")]
        public List<Product> SearchProduct(string keyword)
        {
            return _productService.SearchProduct(keyword);
        }

        //[HttpGet("search")]
        //public IEnumerable<Product> ResetSearchProduct()
        //{
        //    return _productService.GetProducts();
        //}
    }
}
