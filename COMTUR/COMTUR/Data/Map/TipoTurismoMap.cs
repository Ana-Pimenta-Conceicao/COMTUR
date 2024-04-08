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

			// Relacionamento TipoTurismo com Anuncio
			builder.HasMany(x => x.Anuncios).WithOne(x => x.TipoTurismoModel).IsRequired().OnDelete(DeleteBehavior.Cascade);
		}
	}
}
