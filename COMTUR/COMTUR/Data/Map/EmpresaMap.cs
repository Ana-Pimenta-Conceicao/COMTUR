﻿using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace COMTUR.Data.Map
{
	public class EmpresaMap : IEntityTypeConfiguration<EmpresaModel>
	{
		public void Configure(EntityTypeBuilder<EmpresaModel> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Nome).IsRequired().HasMaxLength(50);
			builder.Property(ta => ta.Status).IsRequired();

			// Relacionamento da Empresa com Empresario
			builder.HasOne(e => e.UsuarioModel).WithMany(u => u.Empresas).HasForeignKey(e => e.IdUsuario);

			// Relacionamento de Empresa com TipoTurismo
			builder.HasOne(x => x.TipoTurismoModel).WithMany().HasForeignKey(x => x.IdTipoTurismo);
		}
	}
}
