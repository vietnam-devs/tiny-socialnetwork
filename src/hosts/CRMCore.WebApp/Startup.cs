using AspNetCore.RouteAnalyzer;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using CRMCore.Framework.Entities;
using CRMCore.Framework.MvcCore.Extensions;
using CRMCore.Module.Data;
using CRMCore.Module.Data.Impl;
using CRMCore.Module.Identity.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Reflection;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SpaServices.Webpack;
using System.IO;
using IdentityServer4.AccessTokenValidation;

namespace CRMCore.WebApp
{
    public static class Constants
    {
        public static readonly string ApiPrefix = "/api";
        public static readonly string IdentityPrefix = "/idsrv";
    }

    public static class ServiceCollectionExtensions
    {
        public static IServiceProvider InitServices(this IServiceCollection services, IConfiguration configuration)
        {
            var builder = new ContainerBuilder();

            builder.RegisterGeneric(typeof(EfRepositoryAsync<>))
                .As(typeof(IEfRepositoryAsync<>));

            builder.Register(x => new EfUnitOfWork(
                    x.Resolve<ApplicationDbContext>(),
                    x.Resolve<IServiceProvider>()))
                .As(typeof(IUnitOfWorkAsync))
                .SingleInstance();

            builder.Populate(services);
            return builder.Build().Resolve<IServiceProvider>();
        }
    }

    public class Startup
    {
        private static readonly string[] IdSrvPaths =
        {
            "/client-callback-popup",
            "/client-callback-silent",
            "/account",
            "/error"
        };

        private IConfiguration Configuration { get; }

        private IHostingEnvironment Environment { get; }

        public Startup(IHostingEnvironment env, IConfiguration config)
        {
            Environment = env;
            Configuration = config;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("Default");
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            services.AddSingleton(JavaScriptEncoder.Default);

            services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString));

            services.AddMvcModules();
            services.AddRouteAnalyzer();

            services.RegisterIdentityAndID4(
                options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseMySql(connectionString, sqlOptions =>
                        {
                            sqlOptions.MigrationsAssembly(migrationsAssembly);
                        });
                },
                options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseMySql(connectionString, sqlOptions =>
                        {
                            sqlOptions.MigrationsAssembly(migrationsAssembly);
                        });
                });

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(
                o =>
                {
                    o.Authority = Configuration["OAuth:AuthorityUrl"];
                o.RequireHttpsMetadata = Boolean.Parse(Configuration["OAuth:RequireHttps"]);
                o.ApiName = Configuration["OAuth:ScopeName"];
                    o.SupportedTokens = SupportedTokens.Both;
                    o.RequireHttpsMetadata = false;
                    o.EnableCaching = true;
                    o.CacheDuration = TimeSpan.FromMinutes(10); //default
                });

            return services.InitServices(Configuration);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ProjectPath = Path.GetFullPath("../../modules/CRMCore.Module.Spa"),
                    
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseIdentityServer();


            app.Use((context, next) =>
            {
                if (context.Request.Path.Value == "/")
                {
                    context.Request.Path = new PathString("/home");
                }
                return next();
            });


            app.UseMvc(routes =>
            {
                routes.MapRouteAnalyzer("/routes");

                routes.MapRoute(
                    name: "default",
                    template: "{area:exists}/{controller}/{action}/{id?}",
                    defaults: new {area = "CRMCore.Module.spa", controller = "Home", action= "Index"});

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {area = "CRMCore.Module.spa", controller = "Home", action = "Index" });
            });

            app.UseModules();
        }
    }
}
