namespace COMTUR.Models
{
	public class EntitySecurity
	{
			public string Issuer { get; } = "Server API";
			public string Audience { get; } = "WebSite";
			public string Key { get; } = "COMTUR_BarramentUser_API_Autentication";
		}
}
