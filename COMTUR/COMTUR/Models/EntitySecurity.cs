namespace COMTUR.Models
{
	public class EntitySecurity
	{
			public string Issuer { get; } = "COMTUR_Client";
			public string Audience { get; } = "COMTUR_Server";
			public string Key { get; } = "COMTUR_System";
		}
}
