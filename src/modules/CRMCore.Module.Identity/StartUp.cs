using System;
using CRMCore.Framework.Entities;
using CRMCore.Framework.Entities.Identity;
using CRMCore.Framework.MvcCore;
using CRMCore.Module.Identity.Services;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRMCore.Module.Identity
{
    public class Startup : StartupBase
    {
        public override int Order
        {
            get
            {
                return 1;
            }
        }
        public override void ConfigureServices(IServiceCollection services)
        {
            var configuration = services.BuildServiceProvider().GetService<IConfiguration>();
            services.AddOptions()
                    .Configure<PagingOption>(configuration.GetSection("Paging"));
            
            services.AddScoped<ILoginService<ApplicationUser>, LoginService>();
            services.AddTransient<IProfileService, IdentityWithAdditionalClaimsProfileService>();
        }

        public override void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //builder.UseAuthentication();
            //builder.UseIdentityServer();
        }
    }
}
