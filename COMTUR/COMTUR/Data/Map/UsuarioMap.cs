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
		}
	}
}
