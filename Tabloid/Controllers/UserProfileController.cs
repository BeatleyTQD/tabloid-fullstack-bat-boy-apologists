using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }


        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [Authorize]
        [HttpGet("deactivated")]
        public IActionResult GetDeactivatedUsers()
        {
            return Ok(_userProfileRepository.GetDeactivated());
        }



        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var user = _userProfileRepository.GetById(id);
            if (user != null)
            {
                NotFound();
            }
            return Ok(user);
        }

       
        
        // POST Soft delete, moves User to a "Deactivated" group
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int Id)
        {
            try
            {
                _userProfileRepository.DeleteUser(Id);
                return NoContent();
            }
            catch
            {
                UserProfile user = _userProfileRepository.GetById(Id);
                user.Error = true;
                if (user != null)
                {
                    NotFound();
                }
                return Forbid();
            }
        }

        [HttpPut("reactivate/{id}")]
        public ActionResult Reactivate(int id)
        {
            try
            {
                _userProfileRepository.ReactivateUser(id);
                return NoContent();
            }
            catch
            {
                return Forbid();
            }
        }

    }
}
