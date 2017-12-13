using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public List<PostComment> Comments
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
