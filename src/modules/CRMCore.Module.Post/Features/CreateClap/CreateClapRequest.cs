using System;
using CRMCore.Module.Post.Models;

namespace CRMCore.Module.Post.Features.CreateClap
{
    public class CreateClapRequest
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
