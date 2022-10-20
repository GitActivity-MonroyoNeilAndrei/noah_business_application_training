using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(InterfaceV3.Startup))]
namespace InterfaceV3
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
