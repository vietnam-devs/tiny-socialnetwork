using System;
using CRMCore.Framework.Entities;

namespace CRMCore.Module.Post.Models
{
    public enum EntityType
    {
        Post = 0,
        Comment =1
    }

    public class Clap: EntityBase
    {
        public Guid EntityId
        {
            get;
            set;
        }

        public EntityType Type
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
