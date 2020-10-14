using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ITagRepository _tagRepository;

        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository, ITagRepository tagRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
             _tagRepository = tagRepository;
        }
        
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);

        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.UpdatePost(post);
            return NoContent();
        }
            
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

        [Authorize]
        [HttpGet("myposts")]
        public IActionResult MyPosts()
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            return Ok(_postRepository.GetAllUserPosts(userId));
        }
    }
}
