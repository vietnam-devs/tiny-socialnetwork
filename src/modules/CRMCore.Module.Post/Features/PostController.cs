using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRMCore.Framework.Entities;
using CRMCore.Module.Data;
using CRMCore.Module.Data.Extensions;
using CRMCore.Module.Post.Features.GetPosts;
using CRMCore.Module.Post.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRMCore.Module.Post.Features
{
    [Area("CRMCore.Module.Post")]
    [Route("api/[controller]")]
    [Authorize]
    public class PostController : Controller
    {
        private readonly IEfRepositoryAsync<Models.Post> _postRepo;
        private readonly IOptions<PagingOption> _pagingOption;

        public PostController(IUnitOfWorkAsync unitOfWork,
                              IOptions<PagingOption> pagingOption)
        {
            _postRepo = unitOfWork.Repository<Models.Post>() as IEfRepositoryAsync<Models.Post>;
            _pagingOption = pagingOption;
        }

        [HttpGet()]
        public async Task<PaginatedItem<GetPostsResponse>> Get([FromQuery] GetPostsRequest request)
        {
            var criterion = new Criterion(request.Page, _pagingOption.Value.PageSize, _pagingOption.Value, "Created", "desc");
            var response = await _postRepo.QueryAsync(criterion, x => new GetPostsResponse{
                Id = x.Id,
                Title = x.Title,
                OwnerName = x.OwnerName,
                Description = x.Content,
                CreatedDate =x.Created
            }, null);


            return response;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<PostViewModel> Post([FromBody]PostInputModel model)
        {
            var post = new Models.Post
            {
                Content = model.Description,
                Title = model.Title,

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]PostInputModel model)
        {
            var post = await _postRepo.GetByIdAsync(id);
            if(post == null){
                return NotFound();
            }

            post.Content = model.Description;
            post.Title = model.Title;

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
