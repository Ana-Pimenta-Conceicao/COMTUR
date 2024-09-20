using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using COMTUR.Models.Relational;

namespace COMTUR.Data.Map
{
	public class AvaliacaoEmpresaModelMap : IEntityTypeConfiguration<AvaliacaoEmpresaModel>
	{
		public void Configure(EntityTypeBuilder<AvaliacaoEmpresaModel> builder)
		{

			builder.HasKey(ae => ae.Id);
			builder.Property(ae => ae.Status).IsRequired();


            // Relacionamento de AvaliacaoEmpresaModel para Avaliacao
            builder.HasOne(ae => ae.AvaliacaoModel).WithMany(a => a.AvaliacaoEmpresaModels).HasForeignKey(ae => ae.IdEmpresa);

            // Relacionamento de AvaliacaoEmpresaModel para Empresa
            builder.HasOne(ae => ae.EmpresaModel).WithMany(e => e.AvaliacoesEmpresa).HasForeignKey(ae => ae.IdEmpresa);

        }
	}
}
