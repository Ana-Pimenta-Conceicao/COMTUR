using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class AvaliacaoMap : IEntityTypeConfiguration<AvaliacaoModel>
	{
		public void Configure(EntityTypeBuilder<AvaliacaoModel> builder)
		{

			builder.HasKey(x => x.Id);
			builder.Property(ta => ta.Status).IsRequired();

			// Relacionamento da Avaliacao com funcionario/admin
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Avaliacao).HasForeignKey(e => e.IdUsuario);

		}
	}
}
