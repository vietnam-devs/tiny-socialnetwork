using System;
namespace CRMCore.Module.Post.Features.GetPosts
{
    public class GetPostCommentResponse
    {
        public Guid Id
        {
            get;
            set;
        }

        public Guid PostId
        {
            get;
            set;
        }

        public string Comment
        {
            get;
            set;
        }

        public Guid OwnerId
        {
            get;
            set;
        }

        public string OwnerName
        {
            get;
            set;
        }
    }
}
