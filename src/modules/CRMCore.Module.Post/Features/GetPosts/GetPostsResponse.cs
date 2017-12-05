using System;
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
    }
}
