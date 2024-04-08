using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text.Json.Serialization;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;
using COMTUR.Data;
using System.Text;
using COMTUR.Models;

namespace COMTUR
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			// Configuração do banco de dados
			services.AddDbContext<ComturDBContext>(options =>
				options.UseNpgsql(Configuration.GetConnectionString("DataBase")));

			// Configuração do Swagger
			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "COMTUR", Version = "v1" });

				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					Description = @"Enter 'Bearer' [space] your token",
					Name = "Authorization",
					In = ParameterLocation.Header,
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer"
				});

				c.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							},
							Scheme = "oauth2",
							Name = "Bearer",
							In = ParameterLocation.Header
						},
						new List<string>()
			}
			});
			});

			// Configuração da autenticação JWT
			services.AddAuthentication("Bearer")
				.AddJwtBearer("Bearer", options =>
				{
					EntitySecurity entitySecurity = new();
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = entitySecurity.Issuer,
						ValidAudience = entitySecurity.Audience,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(entitySecurity.Key)),
					};
				});

			services.AddControllers().AddJsonOptions(
				c => c.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

			services.AddEndpointsApiExplorer();

			services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
			{
				builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials();
			}));

			services.AddAuthorization(options =>
			{
				options.AddPolicy("ApiScope", policy =>
				{
					policy.RequireClaim("scope", "comtur");
				});
			});

			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

			// Injeção de dependências

			// Dependência: AtracaoRepositorio
			services.AddScoped<IAtracaoRepositorio, AtracaoRepositorio>();
			// Dependência: EmpresaRepositorio
			services.AddScoped<IEmpresaRepositorio, EmpresaRepositorio>();
			// Dependência: ImagemAtracao
			services.AddScoped<IImagemAtracaoRepositorio, ImagemAtracaoRepositorio>();
			// Dependência: ImagemNoticia
			services.AddScoped<IImagemNoticiaRepositorio, ImagemNoticiaRepositorio>();
			// Dependência: Noticia
			services.AddScoped<INoticiaRepository, NoticiaRepository>();
			// Dependência: TipoAtração
			services.AddScoped<ITipoAtracaoRepositorio, TipoAtracaoRepositorio>();
			// Dependência: TipoTurismo
			services.AddScoped<ITipoTurismoRepositorio, TipoTurismoRepositorio>();
			// Dependência: TipoUsuario
			services.AddScoped<IUsuarioRepositorio, UsuarioRepositorio>();
			// Dependência: ImagemEmpresa
			services.AddScoped<IImagemEmpresaRepositorio, ImagemEmpresaRepositorio>();
			// Dependência: ImagemTurismo
			services.AddScoped<IImagemTurismoRepositorio, ImagemTurismoRepositorio>();
			// Dependência: Anuncio
			services.AddScoped<IAnuncioRepositorio, AnuncioRepositorio>();

		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c =>
				{
					c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sua API V1");
					// Adicione essas linhas para habilitar o botão "Authorize"
					c.DocExpansion(DocExpansion.None);
					c.DisplayRequestDuration();
					c.EnableDeepLinking();
					c.EnableFilter();
					c.ShowExtensions();
					c.EnableValidator();
					c.SupportedSubmitMethods(SubmitMethod.Get, SubmitMethod.Post, SubmitMethod.Put, SubmitMethod.Delete);
					c.OAuthClientId("swagger-ui");
					c.OAuthAppName("Swagger UI");
				});
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseCors("MyPolicy");

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}

