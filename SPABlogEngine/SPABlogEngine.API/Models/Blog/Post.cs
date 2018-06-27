using System.ComponentModel.DataAnnotations;

namespace SPABlogEngine.API.Models.Blog
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public int PostCategoryId { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Content { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public DateTime UpdatedDate { get; set; }

        public virtual PostCategory PostCategory { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
