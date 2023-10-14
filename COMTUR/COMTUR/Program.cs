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

			builder.Services.AddDbContext<ComturDBContext>(options =>
						  options.UseNpgsql(connectionString));

			builder.Services.AddTransient<ITipoTurismoRepositorio, TipoTurismoRepositorio>();
            builder.Services.AddTransient<ITipoAtracaoRepositorio, TipoAtracaoRepositorio>();
			builder.Services.AddTransient<INoticiaRepository, NoticiaRepository>();

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

			app.Run();
		}
	}
}