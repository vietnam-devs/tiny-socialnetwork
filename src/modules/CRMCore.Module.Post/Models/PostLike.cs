using System;
using CRMCore.Framework.Entities;

namespace CRMCore.Module.Post.Models
{
    public class PostLike: EntityBase
    {
        public Guid PostId
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
