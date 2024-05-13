﻿using COMTUR.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Data.Map
{
	public class ImagemTurismoMap : IEntityTypeConfiguration<ImagemTurismoModel>
	{
			public void Configure(EntityTypeBuilder<ImagemTurismoModel> builder)
			{
				builder.HasKey(x => x.Id);

			//Relacionamento da ImagemTurismo com Turismo
				builder.HasOne(x => x.TurismoModel)
					   .WithMany(n => n.ImagemTurismo)
					   .HasForeignKey(x => x.IdTurismo)
					   .IsRequired();
		}
	}
}
