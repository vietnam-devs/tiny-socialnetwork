using System;
using System.Collections.Generic;
using CRMCore.Module.Post.Features.GetClap;

namespace CRMCore.Module.Post.Features.GetPosts
{
    public class GetPostsResponse
    {
        public Guid Id
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        public string Description
        {
            get;
            set;
        }

        public string OwnerName
        {
            get;
            set;
        }

        public DateTime CreatedDate
        {
            get;
            set;
        }

        public List<GetPostCommentResponse> Comments
        {
            get;
            set;
        }

        public List<GetClapResponse> Claps
        {
            get;
            set;
        }
    }
}
