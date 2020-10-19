using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        public ImageUploadController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile body)
        {
            var saveFile = Path.Combine(_environment.ContentRootPath, "client", "public", body.FileName);
            if (body.Length > 0)
            {
                using (var stream = new FileStream(saveFile, FileMode.Create))
                
                {
                    await body.CopyToAsync(stream);
                }
            }
            return Ok();
        }
    }
}