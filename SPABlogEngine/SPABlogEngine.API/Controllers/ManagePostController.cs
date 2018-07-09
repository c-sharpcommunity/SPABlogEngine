using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPABlogEngine.API.Data;
using SPABlogEngine.API.Models.Blog;

namespace SPABlogEngine.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class ManagePostController : Controller
    {
        private IMapper _mapper;
        private ApplicationDbContext dbContext;
        public ManagePostController(IMapper mapper, ApplicationDbContext context)
        {
            this._mapper = mapper;
            this.dbContext = context;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<PostViewModel> Get()
        {
            IEnumerable<PostViewModel> list = this._mapper.Map<IEnumerable<PostViewModel>>(this.dbContext.Posts.Include(blog => blog.PostCategory).AsEnumerable());
            return list;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = this._mapper.Map<PostViewModel>(this.dbContext.Posts.Find(id));
            return Ok(post);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] PostViewModel post)
        {
            if (ModelState.IsValid)
            {
                // post.Registered = DateTime.Now;
                post.UserId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
                var newPost = this._mapper.Map<Post>(post);
                this.dbContext.Posts.Add(newPost);
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
        public IActionResult Put(int id, [FromBody] PostViewModel value)
        {
            if (ModelState.IsValid)
            {
                var existingPost = this.dbContext.Posts.Find(id);
                if (existingPost == null)
                {
                    return NotFound();
                }
                else
                {
                    existingPost.UserId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
                    existingPost.PostCategoryId = value.PostCategoryId;
                    existingPost.Title = value.Title;
                    existingPost.Image = value.Image;
                    existingPost.Content = value.Content;
                    this.dbContext.Posts.Update(existingPost);
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
            this.dbContext.Posts.Remove(this.dbContext.Posts.Find(id));
            this.dbContext.SaveChanges();
            return Ok();
        }
    }
}