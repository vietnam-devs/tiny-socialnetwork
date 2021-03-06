﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CRMCore.Framework.Entities;
using CRMCore.Module.Data;
using CRMCore.Module.Data.Extensions;
using CRMCore.Module.Post.Features.CreateClap;
using CRMCore.Module.Post.Features.CreateCommment;
using CRMCore.Module.Post.Features.GetClap;
using CRMCore.Module.Post.Features.GetPosts;
using CRMCore.Module.Post.Hubs;
using CRMCore.Module.Post.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
        private readonly IEfRepositoryAsync<Models.PostComment> _postCommentRepo;
        private readonly IEfRepositoryAsync<Models.Clap> _clapRepo;
        private readonly IOptions<PagingOption> _pagingOption;

        private readonly IHubContext<PostMessageHub> _postMessageHubContext;

        public PostController(IUnitOfWorkAsync unitOfWork,
                              IOptions<PagingOption> pagingOption,
                              IHubContext<PostMessageHub> postMessageHubContext)
        {
            _postRepo = unitOfWork.Repository<Models.Post>() as IEfRepositoryAsync<Models.Post>;
            _postCommentRepo = unitOfWork.Repository<Models.PostComment>() as IEfRepositoryAsync<Models.PostComment>;
            _clapRepo = unitOfWork.Repository<Models.Clap>() as IEfRepositoryAsync<Models.Clap>;
            _pagingOption = pagingOption;

            _postMessageHubContext = postMessageHubContext;
        }

        private Guid CurrentUserId
        {
            get
            {
                return Guid.Parse(User.Claims.FirstOrDefault(x => x.Type == "sub").Value);
            }
        }

        [HttpGet()]
        public async Task<PaginatedItem<GetPostsResponse>> Get([FromQuery] GetPostsRequest request)
        {
            var criterion = new Criterion(request.Page, _pagingOption.Value.PageSize, _pagingOption.Value, "Created", "desc");

            var posts = await _postRepo.QueryAsync(criterion, x => x, x => x.Comments, x => x.Claps);

            var result = posts.Items.Select(x => new GetPostsResponse
            {
                Id = x.Id,
                Title = x.Title,
                OwnerName = x.OwnerName,
                Description = x.Content,
                CreatedDate = x.Created,
                Claps = x.Claps
                         .Where(c => c.EntityId == x.Id)
                         .Select(c => new GetClapResponse
                         {
                             EntityId = c.EntityId,
                             Id = c.Id,
                             OwnerName = c.OwnerName
                         }).ToList(),
                Comments = x.Comments
                            .Where(c => c.PostId == x.Id)
                            .Select(c => new GetPostCommentResponse
                            {
                                Id = c.Id,
                                PostId = c.PostId,
                                Comment = c.Comment,
                                OwnerName = c.OwnerName,
                                CreatedDate = c.Created
                            }).ToList()
            }).ToList();

            return new PaginatedItem<GetPostsResponse>(posts.TotalItems, posts.TotalPages, result);
        }

        [HttpPost]
        public async Task<PostViewModel> Post([FromBody]PostInputModel model)
        {
            var post = new Models.Post
            {
                Content = model.Description,
                Title = model.Title,
                OwnerId = CurrentUserId,
                OwnerName = User.Identity.Name
            };

            await _postRepo.AddAsync(post);

            var response = new PostViewModel()
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Content,
                OwnerName = post.OwnerName,
                CreatedDate = post.Created
            };

            await _postMessageHubContext.Clients.All.InvokeAsync("AddPostSuccess", response);

            return response;
        }

        [HttpPost("{postId}/comment")]
        public async Task<CreateCommentResponse> CreatePostComment(Guid postId, [FromBody]CreateCommentRequest model)
        {
            var comment = new Models.PostComment
            {
                Comment = model.Comment,
                OwnerId = CurrentUserId,
                OwnerName = User.Identity.Name,
                PostId = postId
            };

            await _postCommentRepo.AddAsync(comment);

            var response = new CreateCommentResponse
            {
                Id = comment.Id,
                Comment = comment.Comment,
                PostId = comment.PostId,
                OwnerName = comment.OwnerName,
                CreatedDate = comment.Created
            };

            await _postMessageHubContext.Clients.All.InvokeAsync("AddCommentSuccess", response);

            return response;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]PostInputModel model)
        {
            var post = await _postRepo.GetByIdAsync(id);
            if (post == null)
            {
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

            await _postMessageHubContext.Clients.All.InvokeAsync("DeletePostSuccess", id);

            return new NoContentResult();
        }

        [HttpPost("clap")]
        public async Task<GetClapResponse> Clap([FromBody]CreateClapRequest model)
        {
            var clap = new Models.Clap
            {
                EntityId = model.EntityId,
                Type = model.Type,
                OwnerId = CurrentUserId,
                OwnerName = User.Identity.Name
            };

            await _clapRepo.AddAsync(clap);

            var response = new GetClapResponse()
            {
                EntityId = clap.EntityId,
                Id = clap.Id,
                OwnerName = clap.OwnerName
            };

            await _postMessageHubContext.Clients.All.InvokeAsync("AddClapSuccess", response);

            return response;
        }

    }
}
