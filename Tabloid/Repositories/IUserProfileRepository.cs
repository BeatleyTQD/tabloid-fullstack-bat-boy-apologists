using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void DeleteUser(int id);
        List<UserProfile> GetDeactivated();
        void ReactivateUser(int id);
        void UpdateUser(UserProfile user);
    }
}