using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }


        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }


        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.CreateCategory(category);

            return CreatedAtAction("Get", new { id = category.Id }, category);

        }
    }
}
