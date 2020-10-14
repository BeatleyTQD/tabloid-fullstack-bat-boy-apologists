using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ITagRepository _tagRepository;

        public PostTagController(IPostRepository postRepository, ITagRepository tagRepository)
        {
            _postRepository = postRepository;
            _tagRepository = tagRepository;
        }

        // GET: api/<PostTagController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PostTagController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            List<Tag> tags = _tagRepository.GetPostTags(id);
            if (tags == null)
            {
                return NotFound();
            }
            return Ok(tags);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _tagRepository.AddPostTag(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        // PUT api/<PostTagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostTagController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _tagRepository.DeleteAllTagsByPostId(id);
        }
    }
}
