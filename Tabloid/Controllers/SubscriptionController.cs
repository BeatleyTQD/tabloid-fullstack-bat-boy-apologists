using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

    [Authorize]
    public class SubscriptionController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public SubscriptionController(IPostRepository postRepository, IUserProfileRepository userProfileRepository, ISubscriptionRepository subscriptionRepository)
        {
            _postRepository = postRepository;
            _subscriptionRepository = subscriptionRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        // Get api/<SubscriptionController>
        [HttpGet] 
        public IActionResult Get()
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            return Ok(_subscriptionRepository.GetAllSubscribedIds(userId));
            
        }


        // POST api/<SubscriptionController>
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            subscription.SubscriberUserProfileId = userId;

            _subscriptionRepository.AddSubscription(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        // POST Deactivates Subscription
        [HttpPut]
        public ActionResult Edit(Subscription subscription)
        {
            UserProfile user = GetCurrentUserProfile();
            int userId = user.Id;
            subscription.SubscriberUserProfileId = userId;
            _subscriptionRepository.DeactivateSubscription(subscription);
                return NoContent();
            
            
        }
        
    }
}
