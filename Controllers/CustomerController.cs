using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using capstone.Data;
using capstone.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace capstone.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Customer[] customers = null;
            customers = _context.Customers.Where(a => a.UserId == userId).ToArray();

            return customers;
        }
        [HttpPost]
        public Customer Post([FromBody] Customer customer)
        {
            customer.UserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return customer;
        }

        [HttpDelete("{id}")]
        public async Task<Customer> Delete(int id)
        {
            var del = await _context.Customers.FindAsync(id);

            if (del != null)
                _context.Remove(del);

            await _context.SaveChangesAsync();

            return del;
        }


    }
}