using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class AtracaoMap : IEntityTypeConfiguration<AtracaoModel>
	{
		public void Configure(EntityTypeBuilder<AtracaoModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
			builder.Property(x => x.Descrição).IsRequired().HasMaxLength(200);
			builder.Property(x => x.QRCode).IsRequired().HasMaxLength(50);
			builder.HasOne(x => x.TipoAtracaoModel).WithMany().HasForeignKey(x => x.IdTipoAtracao);
		}
	}
}