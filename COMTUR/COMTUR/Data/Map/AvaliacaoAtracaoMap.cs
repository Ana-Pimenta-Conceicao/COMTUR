using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
    public class AvaliacaoAtracaoModelMap : IEntityTypeConfiguration<AvaliacaoAtracaoModel>
	{
		public void Configure(EntityTypeBuilder<AvaliacaoAtracaoModel> builder)
		{

			builder.HasKey(aa => aa.Id);
			builder.Property(aa => aa.Status).IsRequired();


            // Relacionamento de AvaliacaoAtracaoModel para Avaliacao
            builder.HasOne(aa => aa.AvaliacaoModel).WithMany(a => a.AvaliacaoAtracoes).HasForeignKey(aa => aa.IdAvaliacao);

            // Relacionamento de AvaliacaoAtracaoModel para Atracao
            builder.HasOne(aa => aa.AtracaoModel).WithMany(a => a.AvaliacoesAtracao).HasForeignKey(aa => aa.IdAtracao);

        }
	}
}
