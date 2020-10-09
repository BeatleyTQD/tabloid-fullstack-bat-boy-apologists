﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();

        public void CreateCategory(Category category);

        //void AddCategory(Category category);
        //void UpdateCategory(Category category);
        //void DeleteCategory(int categoryId);
        //Category GetCategoryById(int categoryId);
    }
}