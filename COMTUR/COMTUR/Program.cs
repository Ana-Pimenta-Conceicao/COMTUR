using COMTUR.Data;
using COMTUR.Repositorios;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace COMTUR
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var connectionString = builder.Configuration.GetConnectionString("DataBase");

			builder.Services.AddCors(o => o.AddPolicy("MyPolicy",
					builder =>
					{
						builder.WithOrigins("http://localhost:3000", "http://localhost:5173")
						.AllowAnyMethod()
						.AllowAnyHeader()
						.AllowCredentials();
					}));

			builder.Services.AddDbContext<ComturDBContext>(options =>
						  options.UseNpgsql(connectionString));

			builder.Services.AddTransient<ITipoTurismoRepositorio, TipoTurismoRepositorio>();
            builder.Services.AddTransient<ITipoAtracaoRepositorio, TipoAtracaoRepositorio>();
			builder.Services.AddTransient<INoticiaRepository, NoticiaRepository>();
			builder.Services.AddTransient<IEmpresarioRepositorio, EmpresarioRepositorio>();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();

			app.MapControllers();

			app.UseCors("MyPolicy");

			app.UseRouting();
			app.Run();
		}
	}
}