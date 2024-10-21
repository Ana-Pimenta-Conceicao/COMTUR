using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace COMTUR.Data.Map
{
	public class AtaMap : IEntityTypeConfiguration<AtaModel>
	{
		public void Configure(EntityTypeBuilder<AtaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.TituloAta).IsRequired().HasMaxLength(100);
			builder.Property(x => x.DocumentoAta).IsRequired();
		}
	}
}
