using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class EmpresaMap : IEntityTypeConfiguration<EmpresaModel>
	{
		public void Configure(EntityTypeBuilder<EmpresaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
			builder.HasOne(x => x.EmpresarioModel).WithMany().HasForeignKey(x => x.IdEmpresario);
		}
	}
}
