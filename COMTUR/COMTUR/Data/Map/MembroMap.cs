using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
    public class MembroMap : IEntityTypeConfiguration<MembroModel>
    {
        public void Configure(EntityTypeBuilder<MembroModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
        }
    }
}
