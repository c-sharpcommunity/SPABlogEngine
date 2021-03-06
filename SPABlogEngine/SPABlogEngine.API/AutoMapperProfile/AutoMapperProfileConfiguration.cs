﻿using AutoMapper;
using SPABlogEngine.API.Models.Blog;

namespace SPABlogEngine.API.AutoMapperProfile
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration()
       : this("MyProfile")
        {
        }
        protected AutoMapperProfileConfiguration(string profileName)
        : base(profileName)
        {
            CreateMap<PostCategory, PostCategoryViewModel>().ReverseMap();
            CreateMap<Post, PostViewModel>()
                .ForMember(des => des.CategoryName, opt => opt.MapFrom(e => e.PostCategory.Title))
                .ReverseMap();
        }
    }
}
