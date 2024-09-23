using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using COMTUR.Models.Relational;

namespace COMTUR.Data.Map
{
	public class AvaliacaoTurismoModelMap : IEntityTypeConfiguration<AvaliacaoTurismoModel>
	{
		public void Configure(EntityTypeBuilder<AvaliacaoTurismoModel> builder)
		{

			builder.HasKey(at => at.Id);
			builder.Property(at => at.Status).IsRequired();


            // Relacionamento de AvaliacaoTurismoModel para Avaliacao
            builder.HasOne(at => at.AvaliacaoModel).WithMany(a => a.AvaliacaoTurismoModels).HasForeignKey(at => at.IdTurismo);

            // Relacionamento de AvaliacaoTurismoModel para Turismo
            builder.HasOne(at => at.TurismoModel).WithMany(t => t.AvaliacoesTurismo).HasForeignKey(at => at.IdTurismo);

        }
	}
}
