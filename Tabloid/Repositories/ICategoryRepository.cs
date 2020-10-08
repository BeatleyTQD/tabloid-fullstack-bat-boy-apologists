using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        //void AddCategory(Category category);
        //void UpdateCategory(Category category);
        //void DeleteCategory(int categoryId);
        //Category GetCategoryById(int categoryId);
    }
}