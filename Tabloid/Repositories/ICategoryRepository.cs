using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();

        public void CreateCategory(Category category);

        public void DeleteCategory(int categoryId);

      
    }
}