using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class RamoEmpresaMap : IEntityTypeConfiguration<RamoEmpresaModel>
	{
		public void Configure(EntityTypeBuilder<RamoEmpresaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
		}
	}
}
