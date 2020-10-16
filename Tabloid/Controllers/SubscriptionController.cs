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


    public class SubscriptionController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SubscriptionController(IPostRepository postRepository, ISubscriptionRepository subscriptionRepository)
        {
            _postRepository = postRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        // POST api/<SubscriptionController>
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.AddSubscription(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }

        // POST Soft delete, moves User to a "Deactivated" group
        [Authorize]
        [HttpPut]
        public ActionResult Edit(Subscription subscription)
        {
                _subscriptionRepository.DeactivateSubscription(subscription);
                return NoContent();
            
            
        }
        
    }
}
