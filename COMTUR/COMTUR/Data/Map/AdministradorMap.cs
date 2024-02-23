using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
    public class AdministradorMap : IEntityTypeConfiguration<AdministradorModel>
    {
        public void Configure(EntityTypeBuilder<AdministradorModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.NomeAdministrador).IsRequired().HasMaxLength(50);
        }
    }
}
