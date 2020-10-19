using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void DeletePost(int postId);
        List<Post> GetAllPublishedPosts();
        List<Post> GetAllSubscribedPosts(int subscriberUserProfileId);
        List<Post> GetAllUserPosts(int userProfileId);
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        void UpdatePost(Post post);
    }
}