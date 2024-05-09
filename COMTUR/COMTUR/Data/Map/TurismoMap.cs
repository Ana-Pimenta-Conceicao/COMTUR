using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class TurismoMap : IEntityTypeConfiguration<TurismoModel>
	{
		public void Configure(EntityTypeBuilder<TurismoModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);

			// Relacionamento da Turismo com funcionario/admin
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Turismos).HasForeignKey(e => e.IdUsuario);

			// Relacionamento da Turismo com TipoTurismo
			builder.HasOne(x => x.TipoTurismoModel).WithMany().HasForeignKey(x => x.IdTipoTurismo);

			// Relacionamento Turismo com ImagemTurismo
			builder.HasMany(n => n.ImagemTurismo)
				   .WithOne(im => im.TurismoModel)
				   .HasForeignKey(im => im.IdTurismo)
				   .IsRequired()
				   .OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Turismo com Atracao
			builder.HasMany(x => x.Atracao).WithOne(x => x.TurismoModel).OnDelete(DeleteBehavior.Cascade);

			// Relacionamento Turismo com Noticia
			builder.HasMany(x => x.Noticia).WithOne(x => x.TurismoModel).IsRequired().OnDelete(DeleteBehavior.Cascade);
		}
	}
}
