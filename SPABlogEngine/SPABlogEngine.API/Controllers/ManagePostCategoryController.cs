using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SPABlogEngine.API.Data;
using SPABlogEngine.API.Models.Blog;

namespace SPABlogEngine.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class ManagePostCategoryController : Controller
    {
        private IMapper _mapper;
        private ApplicationDbContext dbContext;
        public ManagePostCategoryController(IMapper mapper, ApplicationDbContext context)
        {
            this._mapper = mapper;
            this.dbContext = context;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<PostCategoryViewModel> Get()
        {
            IEnumerable<PostCategoryViewModel> list = this._mapper.Map<IEnumerable<PostCategoryViewModel>>(this.dbContext.PostCategories.AsEnumerable());
            return list;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = this._mapper.Map<PostCategoryViewModel>(this.dbContext.PostCategories.Find(id));
            return Ok(category);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] PostCategoryViewModel category)
        {
            if (ModelState.IsValid)
            {
                // category.Registered = DateTime.Now;
                var newCategory = this._mapper.Map<PostCategory>(category);
                this.dbContext.PostCategories.Add(newCategory);
                this.dbContext.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PostCategoryViewModel value)
        {
            if (ModelState.IsValid)
            {
                var existingCategory = this.dbContext.PostCategories.Find(id);
                if (existingCategory == null)
                {
                    return NotFound();
                }
                else
                {
                    string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value; // add userId here.
                    existingCategory.UserId = userId;
                    existingCategory.Title = value.Title;
                    existingCategory.Description = value.Description;
                    this.dbContext.PostCategories.Update(existingCategory);
                    this.dbContext.SaveChanges();
                    return Ok();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            this.dbContext.PostCategories.Remove(this.dbContext.PostCategories.Find(id));
            this.dbContext.SaveChanges();
            return Ok();
        }
    }
}