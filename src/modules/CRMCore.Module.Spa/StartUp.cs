using System;
using CRMCore.Framework.MvcCore;
using CRMCore.Module.Spa.ViewModel;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRMCore.Module.Spa
{
    public class Startup : StartupBase
    {
        public override int Order
        {
            get
            {
                return 0;
            }
        }

        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ClientAppSettings>(Configuration.GetSection("ClientAppSettings"));
        }

        public override void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
        }
    }
}