using Demo.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Data
{
  public class DemoDbContext : IdentityDbContext
  {
    public DemoDbContext(DbContextOptions<DemoDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      // Seed data
      base.OnModelCreating(builder);
      var hasher = new PasswordHasher<IdentityUser>();
      builder.Entity<IdentityUser>().HasData(new IdentityUser
      {
        Id = "1",
        UserName = "admin",
        NormalizedUserName = "admin",
        Email = "some-admin-email@nonce.fake",
        NormalizedEmail = "some-admin-email@nonce.fake",
        EmailConfirmed = true,
        PasswordHash = hasher.HashPassword(null, "admin@123"),
        SecurityStamp = string.Empty
      });
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var builder = new ConfigurationBuilder()
                      .SetBasePath(Directory.GetCurrentDirectory())
                      .AddJsonFile("appsettings.json");
      var configuration = builder.Build();
      optionsBuilder.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]);

    }
    public DbSet<Product> Products { get; set; }
  }
}
