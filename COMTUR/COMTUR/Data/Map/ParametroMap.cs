using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
    public class ParametroMap : IEntityTypeConfiguration<ParametroModel>
    {
        public void Configure(EntityTypeBuilder<ParametroModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DefinicaoTurismo).IsRequired();
        }
    }
}
