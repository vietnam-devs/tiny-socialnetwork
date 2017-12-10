using System;
namespace CRMCore.Module.Post.Features.CreateCommment
{
    public class CreateCommentResponse
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

        public string OwnerName
        {
            get;
            set;
        }
    }
}
