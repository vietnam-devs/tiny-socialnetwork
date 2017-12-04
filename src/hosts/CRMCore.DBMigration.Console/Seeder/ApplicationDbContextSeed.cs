using CRMCore.Framework.Entities.Identity;
using CRMCore.Module.Data;
using CRMCore.Module.Post.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;
using CRMCore.DBMigration.Console.Extensions;

namespace CRMCore.DBMigration.Console.Seeder
{
    public class ApplicationDbContextSeed
    {
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher = new PasswordHasher<ApplicationUser>();

        public async Task SeedAsync(ApplicationDbContext context, IHostingEnvironment env, ILogger<ApplicationDbContextSeed> logger)
        {
            logger.LogInformation("Begin Seed data - Application DB context");
            var contentRootPath = env.ContentRootPath;

            try
            {
                await ImportUsers(context, logger, contentRootPath);
                await ImportPosts(context, logger, contentRootPath);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message, $"There is an error migrating data for ApplicationDbContext");
            }
        }

        private async Task ImportPosts(ApplicationDbContext context, ILogger<ApplicationDbContextSeed> logger, string contentRootPath)
        {
            var importetPosts = GetPostsFromFile(contentRootPath, logger);
            IList<ApplicationUser> users = context.Users.ToList();
            IList<PostComment> commnets = new List<PostComment>();
            IList<PostLike> likes = new List<PostLike>();

            foreach (var post in importetPosts)
            {
                var rnd = new Random().Next(users.Count());
                post.Id = Guid.NewGuid();
                post.OwnerId = users[rnd].Id;
                post.OwnerName = users[rnd].Email;
                for (int i = 0; i < rnd; i++)
                {
                    var commentRnd = new Random().Next(users.Count());
                    var likeRnd = new Random().Next(users.Count());
                    commnets.Add(new PostComment()
                    {
                        Comment = $"Commnet @{post.Title}",
                        PostId = post.Id,
                        OwnerId = users[commentRnd].Id,
                        OwnerName = users[commentRnd].Email,
                        Created = DateTime.UtcNow,
                        Updated = DateTime.UtcNow
                    });
                    likes.Add(new PostLike()
                    {
                        PostId = post.Id,
                        OwnerId = users[likeRnd].Id,
                        OwnerName = users[likeRnd].Email,
                        Created = DateTime.UtcNow,
                        Updated = DateTime.UtcNow
                    });
                }

            }

            await context.Set<Post>().AddRangeAsync(importetPosts);
            await context.Set<PostComment>().AddRangeAsync(commnets);
            await context.Set<PostLike>().AddRangeAsync(likes);

            await context.SaveChangesAsync();
        }

        private async Task ImportUsers(ApplicationDbContext context, ILogger<ApplicationDbContextSeed> logger, string contentRootPath)
        {
            if (!context.Users.Any())
            {
                await context.Users.AddRangeAsync(GetDefaultUser());
                await context.Users.AddRangeAsync(GetUsersFromFile(contentRootPath, logger));

                await context.SaveChangesAsync();
            }
        }

        private IEnumerable<Post> GetPostsFromFile(string contentRootPath, ILogger logger)
        {
            string csvFileUsers = Path.Combine(contentRootPath, "Setup", "posts.csv");

            string[] csvheaders;

            string[] requiredHeaders = { "title", "content" };

            csvheaders = GetHeaders(requiredHeaders, csvFileUsers);

            List<Post> posts = File.ReadAllLines(csvFileUsers)
                        .Skip(1) // skip header column
                        .Select(row => Regex.Split(row, ";(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"))
                       .SelectTry(column => CreatePost(column, csvheaders))
                        .OnCaughtException(ex => { logger.LogError(ex.Message); return null; })
                        .Where(x => x != null)
                        .ToList();

            return posts;
        }

        private IEnumerable<ApplicationUser> GetUsersFromFile(string contentRootPath, ILogger logger)
        {
            string csvFileUsers = Path.Combine(contentRootPath, "Setup", "Users.csv");

            string[] csvheaders;

            string[] requiredHeaders = { "email", "lastname", "firstname", "phonenumber", "username", "normalizedemail", "normalizedusername", "password" };

            csvheaders = GetHeaders(requiredHeaders, csvFileUsers);

            List<ApplicationUser> users = File.ReadAllLines(csvFileUsers)
                        .Skip(1) // skip header column
                      .Select(row => Regex.Split(row, ";(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"))
                        .SelectTry(column => CreateApplicationUser(column, csvheaders))
                        .OnCaughtException(ex => { logger.LogError(ex.Message); return null; })
                        .Where(x => x != null)
                        .ToList();

            return users;
        }

        private Post CreatePost(string[] column, string[] headers)
        {
            if (column.Count() != headers.Count())
            {
                throw new Exception($"column count '{column.Count()}' not the same as headers count'{headers.Count()}'");
            }

            var post = new Post
            {
                Id = Guid.NewGuid(),
                Title = column[Array.IndexOf(headers, "title")].Trim('"').Trim(),
                Content = column[Array.IndexOf(headers, "content")].Trim('"').Trim(),
                Created = DateTime.UtcNow,
                Updated = DateTime.UtcNow
            };

            return post;
        }


        private ApplicationUser CreateApplicationUser(string[] column, string[] headers)
        {
            if (column.Count() != headers.Count())
            {
                throw new Exception($"column count '{column.Count()}' not the same as headers count'{headers.Count()}'");
            }

            var user = new ApplicationUser
            {
                Email = column[Array.IndexOf(headers, "email")].Trim('"').Trim(),
                Id = Guid.NewGuid(),
                LastName = column[Array.IndexOf(headers, "lastname")].Trim('"').Trim(),
                FirstName = column[Array.IndexOf(headers, "firstname")].Trim('"').Trim(),
                PhoneNumber = column[Array.IndexOf(headers, "phonenumber")].Trim('"').Trim(),
                UserName = column[Array.IndexOf(headers, "username")].Trim('"').Trim(),
                NormalizedEmail = column[Array.IndexOf(headers, "normalizedemail")].Trim('"').Trim(),
                NormalizedUserName = column[Array.IndexOf(headers, "normalizedusername")].Trim('"').Trim(),
                SecurityStamp = Guid.NewGuid().ToString("D"),
                PasswordHash = column[Array.IndexOf(headers, "password")].Trim('"').Trim(), // Note: This is the password
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, user.PasswordHash);

            return user;
        }

        static string[] GetHeaders(string[] requiredHeaders, string csvfile)
        {
            string[] csvheaders = File.ReadLines(csvfile).First().ToLowerInvariant().Split(';');

            if (csvheaders.Count() != requiredHeaders.Count())
            {
                throw new Exception($"requiredHeader count '{ requiredHeaders.Count()}' is different then read header '{csvheaders.Count()}'");
            }

            foreach (var requiredHeader in requiredHeaders)
            {
                if (!csvheaders.Contains(requiredHeader))
                {
                    throw new Exception($"does not contain required header '{requiredHeader}'");
                }
            }

            return csvheaders;
        }


        private IEnumerable<ApplicationUser> GetDefaultUser()
        {
            var user = new ApplicationUser()
            {
                Email = "demouser@nomail.com",
                LastName = "DemoLastName",
                FirstName = "DemoUser",
                PhoneNumber = "1234567890",
                UserName = "demouser@nomail.com",
                NormalizedEmail = "DEMOUSER@NOMAIL.COM",
                NormalizedUserName = "DEMOUSER@NOMAIL.COM",
                SecurityStamp = Guid.NewGuid().ToString("D")
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, "P@ssw0rd");

            return new List<ApplicationUser>()
            {
                user
            };
        }
    }
}
