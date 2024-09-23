using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class AvaliacaoMap : IEntityTypeConfiguration<AvaliacaoModel>
	{
		public void Configure(EntityTypeBuilder<AvaliacaoModel> builder)
		{

			builder.HasKey(a => a.Id);
			builder.Property(a => a.Status).IsRequired();

			// Relacionamento da Avaliacao com Usuario
			builder.HasOne(a => a.UsuarioModel).WithMany(u => u.Avaliacao).HasForeignKey(a => a.IdUsuario);

		}
	}
}
