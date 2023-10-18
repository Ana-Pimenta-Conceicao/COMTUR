using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class EmpresarioMap : IEntityTypeConfiguration<EmpresarioModel>
	{
		public void Configure(EntityTypeBuilder<EmpresarioModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
		}
	}
}
