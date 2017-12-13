using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CRMCore.Framework.Entities;

namespace CRMCore.Module.Post.Models
{
    public class PostComment: EntityBase
    {
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

        [ForeignKey("EntityId")]
        public List<Clap> Claps
        {
            get;
            set;
        }
    }
}
