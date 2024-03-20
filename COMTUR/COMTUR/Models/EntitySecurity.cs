using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	public class EntitySecurity
	{
			public string Issuer { get; } = "Server API";
			public string Audience { get; } = "WebSite";
			public string Key { get; } = "COMTUR_BarramentUser_API_Autentication";
		}
}
