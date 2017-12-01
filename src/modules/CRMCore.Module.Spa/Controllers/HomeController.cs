using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRMCore.Module.Spa.Controllers
{
    [Area("CRMCore.Module.spa")]
    //[Route("[controller]")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {
        //[Route("")]
        //[Route("Home")]
        //[Route("Home/Index")]
        public IActionResult Index()
        {
            return new VirtualFileResult("/spa/index.html", "text/html");
        }
    }
}
