using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class UsuarioMap : IEntityTypeConfiguration<UsuarioModel>
	{
		public void Configure(EntityTypeBuilder<UsuarioModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);

			// Relacionamento Usuario com Atracao
			builder.HasMany(x => x.Atracao).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com Noticia
			builder.HasMany(x => x.Noticia).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com Empresa
			builder.HasMany(x => x.Empresas).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com Turismo
			builder.HasMany(x => x.Turismos).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com TipoTurismo
			builder.HasMany(x => x.TipoTurismo).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com TipoAtracao
			builder.HasMany(x => x.TipoAtracao).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Usuario com Atracao
			builder.HasMany(x => x.Atracao).WithOne(x => x.UsuarioModel).OnDelete(DeleteBehavior.Cascade);
		}
	}
}
