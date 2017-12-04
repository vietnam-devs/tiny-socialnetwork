using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRMCore.Framework.Entities;
using CRMCore.Module.Data;
using CRMCore.Module.Post.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRMCore.Module.Post.Controllers
{
    [Area("CRMCore.Module.Post")]
    [Route("api/[controller]")]
    [Authorize]
    public class PostController : Controller
    {
        private readonly IEfRepositoryAsync<Models.Post> _postRepo;

        public PostController(IUnitOfWorkAsync unitOfWork)
        {
            _postRepo = unitOfWork.Repository<Models.Post>() as IEfRepositoryAsync<Models.Post>;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IEnumerable<PostViewModel>> Get()
        {
            var response = await _postRepo.ListAsync();
            return  response.Select(x => new PostViewModel()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Content,
                OwnerName = x.OwnerName,
                CreatedDate = x.Created
            });

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<PostViewModel> Post([FromBody]PostInputModel model)
        {
            var post = new Models.Post
            {
                Id = Guid.NewGuid(),
                Content = model.Description,
                Title = model.Title,
                Created = DateTime.UtcNow,
                Updated = DateTime.UtcNow,
                OwnerName = User.Identity.Name
            };

            await _postRepo.AddAsync(post);

            return new PostViewModel()
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Content,
                OwnerName = post.OwnerName,
                CreatedDate = post.Created
            };
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]PostInputModel model)
        {
            var post = await _postRepo.GetByIdAsync(id);
            if(post == null){
                return NotFound();
            }

            post.Content = model.Description;
            post.Title = model.Title;
            post.Updated = DateTime.UtcNow;

            await _postRepo.UpdateAsync(post);

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var post = await _postRepo.GetByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            await _postRepo.DeleteAsync(post);

            return new NoContentResult();
        }
    }
}
