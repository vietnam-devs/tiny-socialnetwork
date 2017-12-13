using System;
using CRMCore.Module.Post.Models;

namespace CRMCore.Module.Post.Features.Clap
{
    public class ClapRequest
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
    }
}
