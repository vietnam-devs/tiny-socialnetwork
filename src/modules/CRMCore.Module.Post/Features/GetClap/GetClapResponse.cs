using System;
namespace CRMCore.Module.Post.Features.GetClap
{
    public class GetClapResponse
    {
        public Guid Id
        {
            get;
            set;
        }

        public Guid EntityId
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
