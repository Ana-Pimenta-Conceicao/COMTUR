using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class TipoTurismoMap : IEntityTypeConfiguration<TipoTurismoModel>
	{
		public void Configure(EntityTypeBuilder<TipoTurismoModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
            builder.HasOne(e => e.UsuarioModel).WithMany().HasForeignKey(e => e.IdUsuario);

            // Relacionamento TipoTurismo com Empresa
            builder.HasMany(x => x.Empresa).WithOne(x => x.TipoTurismoModel).IsRequired().OnDelete(DeleteBehavior.Cascade);
		}
	}
}
