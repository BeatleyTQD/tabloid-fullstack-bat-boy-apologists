using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void AddSubscription(Subscription subscription);
        void DeactivateSubscription(Subscription subscription);
        void DeleteAllSubscriptionsByProviderUserId(int userId);
        void DeleteAllSubscriptionsBySubscribedUserId(int userId);
        List<Subscription> GetAllSubscribedIds(int userId);
    }
}