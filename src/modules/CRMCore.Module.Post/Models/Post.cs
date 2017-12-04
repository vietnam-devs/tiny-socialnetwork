using System;
using CRMCore.Framework.Entities;

namespace CRMCore.Module.Post.Models
{
    public class Post : EntityBase
    {
        public string Title
        {
            get;
            set;
        }

        public string Content
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
