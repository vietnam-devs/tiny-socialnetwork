using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace CRMCore.WebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args){
            var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("hosting.json", optional: true)
            .AddCommandLine(args)
            .Build();
            
            return WebHost.CreateDefaultBuilder(args)
                .UseKestrel(k => { k.AddServerHeader = false; })
                .UseConfiguration(config)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((hostContext, options) =>
                {
                    options.Sources.Clear();
                    options.AddJsonFile("appsettings.json", true, true);
                    options.AddJsonFile($"appsettings.{hostContext.HostingEnvironment.EnvironmentName}.json", true);
                    if (hostContext.HostingEnvironment.IsDevelopment())
                    {
                        options.AddUserSecrets<Startup>();
                    }
                    options.AddEnvironmentVariables();
                    options.AddCommandLine(args);
                })
                .Build();
        }
            
    }
}
