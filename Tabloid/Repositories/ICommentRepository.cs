using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsForPost(int postId);
        Comment GetCommentById(int id);
        void AddComment(Comment comment);
        void DeleteComment(int id);
    }
}