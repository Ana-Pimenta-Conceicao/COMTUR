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

			// Relacionamento da Avaliacao com Atracao
			builder.HasOne(x => x.AtracaoModel).WithMany().HasForeignKey(x => x.IdAtracao);

			// Relacionamento da Avaliacao com Turismo
			builder.HasOne(x => x.TurismoModel).WithMany().HasForeignKey(x => x.IdTurismo);

			// Relacionamento da Avaliacao com funcionario/admin
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Avaliacao).HasForeignKey(e => e.IdUsuario);

		}
	}
}
