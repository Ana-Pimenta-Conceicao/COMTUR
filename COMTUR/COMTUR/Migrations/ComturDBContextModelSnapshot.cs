﻿// <auto-generated />
using System;
using COMTUR.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace COMTUR.Migrations
{
    [DbContext(typeof(ComturDBContext))]
    partial class ComturDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("COMTUR.Models.AnuncioModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("anuncioid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("DescricaoAnuncio")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricaoanuncio");

                    b.Property<int?>("EmpresaModelId")
                        .HasColumnType("integer");

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("integer")
                        .HasColumnName("idempresa");

                    b.Property<int>("IdTipoTurismo")
                        .HasColumnType("integer")
                        .HasColumnName("idtipoturismo");

                    b.Property<string>("Imagem")
                        .HasColumnType("text")
                        .HasColumnName("imagemanuncio");

                    b.Property<string>("Legenda")
                        .HasColumnType("text")
                        .HasColumnName("legendaanuncio");

                    b.Property<string>("NomeEmpresa")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nomeempresa");

                    b.Property<int?>("TipoTurismoModelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaModelId");

                    b.HasIndex("IdEmpresa");

                    b.HasIndex("IdTipoTurismo");

                    b.HasIndex("TipoTurismoModelId");

                    b.ToTable("anuncio");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DescricaoAnuncio = "Não existe mulher feia, existe mulher que não conhece a AnaStore",
                            IdEmpresa = 1,
                            IdTipoTurismo = 1,
                            NomeEmpresa = "AnaStore"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.AtracaoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("atracaoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricao");

                    b.Property<int>("IdTipoAtracao")
                        .HasColumnType("integer")
                        .HasColumnName("idtipoatracao");

                    b.Property<int>("IdTurismo")
                        .HasColumnType("integer")
                        .HasColumnName("idturismo");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.Property<string>("QRCode")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("qrcode");

                    b.Property<int?>("TipoAtracaoModelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("IdTipoAtracao");

                    b.HasIndex("IdTurismo");

                    b.HasIndex("TipoAtracaoModelId");

                    b.ToTable("atracao");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Descricao = "Show da Ana Castela",
                            IdTipoAtracao = 1,
                            IdTurismo = 1,
                            Nome = "Ana Castela",
                            QRCode = "123456"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.EmpresaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("empresaid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<long>("CNPJ")
                        .HasColumnType("bigint")
                        .HasColumnName("cnpj");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricao");

                    b.Property<string>("Endereco")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("endereco");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("usuarioid");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("nome");

                    b.HasKey("Id");

                    b.HasIndex("IdUsuario");

                    b.ToTable("empresa");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CNPJ = 123456L,
                            Descricao = "Ana Rainha o resto NADINHA",
                            Endereco = "Rua das Maravilhas",
                            IdUsuario = 3,
                            Nome = "AnaStore"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.ImagemAtracaoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("imagematracaoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("IdAtracao")
                        .HasColumnType("integer")
                        .HasColumnName("idatracao");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("imagem");

                    b.Property<string>("LegendaImagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("legendaimagem");

                    b.HasKey("Id");

                    b.HasIndex("IdAtracao");

                    b.ToTable("imagematracao");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemEmpresaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("imagemempresaid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("integer")
                        .HasColumnName("idempresa");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("imagem");

                    b.Property<string>("LegendaImagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("legendaimagem");

                    b.HasKey("Id");

                    b.HasIndex("IdEmpresa");

                    b.ToTable("imagemempresa");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemNoticiaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("imagemnoticiaid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("IdNoticia")
                        .HasColumnType("integer")
                        .HasColumnName("idnoticia");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("imagem");

                    b.Property<string>("LegendaImagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("legendaimagem");

                    b.HasKey("Id");

                    b.HasIndex("IdNoticia");

                    b.ToTable("imagemnoticia");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemTurismoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("imagemturismoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("IdTurismo")
                        .HasColumnType("integer")
                        .HasColumnName("idturismo");

                    b.Property<string>("Imagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("imagem");

                    b.Property<string>("LegendaImagem")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("legendaimagem");

                    b.HasKey("Id");

                    b.HasIndex("IdTurismo");

                    b.ToTable("imagemturismo");
                });

            modelBuilder.Entity("COMTUR.Models.NoticiaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("noticiaid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Conteudo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("conteudo");

                    b.Property<DateOnly>("DataPublicacao")
                        .HasColumnType("date")
                        .HasColumnName("datapublicacao");

                    b.Property<string>("HoraPublicacao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("horapublicacao");

                    b.Property<int?>("IdTurismo")
                        .HasColumnType("integer")
                        .HasColumnName("idturismo");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("usuarioid");

                    b.Property<string>("Subtitulo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("subtitulo");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("titulo");

                    b.HasKey("Id");

                    b.HasIndex("IdTurismo");

                    b.HasIndex("IdUsuario");

                    b.ToTable("noticia");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Conteudo = "O fenomeno das redes sociais, AnaStore, agora conta com uma loja fisica",
                            DataPublicacao = new DateOnly(2024, 5, 15),
                            HoraPublicacao = "10:30",
                            IdUsuario = 2,
                            Subtitulo = "A loja mais divonica agora está em espaço fisíco",
                            Titulo = "AnaStore finalmente é inaugurada"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.SessaoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("idssessao");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("EmailUsuario")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("emailusuario");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("idusuario");

                    b.Property<string>("NivelAcesso")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nivelacesso");

                    b.Property<string>("NomeUsuario")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nomeusuario");

                    b.Property<bool>("StatusSessao")
                        .HasColumnType("boolean")
                        .HasColumnName("statussessao");

                    b.Property<string>("TokenSessao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("tokensessao");

                    b.Property<int?>("UsuarioModelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioModelId");

                    b.ToTable("sessao");
                });

            modelBuilder.Entity("COMTUR.Models.TipoAtracaoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("tipoatracaoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("nome");

                    b.HasKey("Id");

                    b.ToTable("tipoatracao");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Nome = "Show"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.TipoTurismoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("tipoturismoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("nome");

                    b.HasKey("Id");

                    b.ToTable("tipoturismo");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Nome = "Expo"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.TurismoModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("turismoid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("descricao");

                    b.Property<string>("DiaFuncionamento")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("diafuncionamento");

                    b.Property<string>("Horario")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("horario");

                    b.Property<int>("IdTipoTurismo")
                        .HasColumnType("integer")
                        .HasColumnName("idtipoturismo");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("usuarioid");

                    b.Property<string>("Local")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("local");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("nome");

                    b.Property<string>("QRCode")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("qrcode");

                    b.Property<int?>("TipoTurismoModelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("IdTipoTurismo");

                    b.HasIndex("IdUsuario");

                    b.HasIndex("TipoTurismoModelId");

                    b.ToTable("turismo");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Descricao = "Praça da Fonte",
                            DiaFuncionamento = "Todos os dias",
                            Horario = "18:00",
                            IdTipoTurismo = 1,
                            IdUsuario = 2,
                            Local = "Praça da Fonte",
                            Nome = "Praça da Fonte",
                            QRCode = "123456"
                        });
                });

            modelBuilder.Entity("COMTUR.Models.UsuarioModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("usuarioid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("EmailUsuario")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("emailusuario");

                    b.Property<string>("ImagemPerfilUsuario")
                        .HasColumnType("text")
                        .HasColumnName("imagemperfilusuario");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("nome");

                    b.Property<string>("SenhaUsuario")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("senhausuario");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("telefone");

                    b.Property<int>("TipoUsuario")
                        .HasColumnType("integer")
                        .HasColumnName("tipousuario");

                    b.HasKey("Id");

                    b.ToTable("usuario");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            EmailUsuario = "usuario@gmail.com",
                            Nome = "Usuário",
                            SenhaUsuario = "123456",
                            Telefone = "(11) 11111-1111",
                            TipoUsuario = 1
                        },
                        new
                        {
                            Id = 2,
                            EmailUsuario = "funcionario@gmail.com",
                            Nome = "Funcionário",
                            SenhaUsuario = "123456",
                            Telefone = "(22) 22222-2222",
                            TipoUsuario = 2
                        },
                        new
                        {
                            Id = 3,
                            EmailUsuario = "empresario@gmail.com",
                            Nome = "Empresário",
                            SenhaUsuario = "123456",
                            Telefone = "(33) 33333-3333",
                            TipoUsuario = 3
                        },
                        new
                        {
                            Id = 4,
                            EmailUsuario = "administrador@gmail.com",
                            Nome = "Administrador",
                            SenhaUsuario = "123456",
                            Telefone = "(44) 44444-4444",
                            TipoUsuario = 4
                        });
                });

            modelBuilder.Entity("COMTUR.Models.AnuncioModel", b =>
                {
                    b.HasOne("COMTUR.Models.EmpresaModel", null)
                        .WithMany("AnuncioEmpresa")
                        .HasForeignKey("EmpresaModelId");

                    b.HasOne("COMTUR.Models.EmpresaModel", "EmpresaModel")
                        .WithMany()
                        .HasForeignKey("IdEmpresa")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.TipoTurismoModel", "TipoTurismoModel")
                        .WithMany()
                        .HasForeignKey("IdTipoTurismo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.TipoTurismoModel", null)
                        .WithMany("Anuncios")
                        .HasForeignKey("TipoTurismoModelId");

                    b.Navigation("EmpresaModel");

                    b.Navigation("TipoTurismoModel");
                });

            modelBuilder.Entity("COMTUR.Models.AtracaoModel", b =>
                {
                    b.HasOne("COMTUR.Models.TipoAtracaoModel", "TipoAtracaoModel")
                        .WithMany()
                        .HasForeignKey("IdTipoAtracao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.TurismoModel", "TurismoModel")
                        .WithMany("Atracao")
                        .HasForeignKey("IdTurismo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.TipoAtracaoModel", null)
                        .WithMany("Atracao")
                        .HasForeignKey("TipoAtracaoModelId");

                    b.Navigation("TipoAtracaoModel");

                    b.Navigation("TurismoModel");
                });

            modelBuilder.Entity("COMTUR.Models.EmpresaModel", b =>
                {
                    b.HasOne("COMTUR.Models.UsuarioModel", "UsuarioModel")
                        .WithMany("Empresas")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UsuarioModel");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemAtracaoModel", b =>
                {
                    b.HasOne("COMTUR.Models.AtracaoModel", "AtracaoModel")
                        .WithMany("ImagemAtracao")
                        .HasForeignKey("IdAtracao")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AtracaoModel");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemEmpresaModel", b =>
                {
                    b.HasOne("COMTUR.Models.EmpresaModel", "EmpresaModel")
                        .WithMany("ImagemEmpresa")
                        .HasForeignKey("IdEmpresa")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmpresaModel");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemNoticiaModel", b =>
                {
                    b.HasOne("COMTUR.Models.NoticiaModel", "NoticiaModel")
                        .WithMany("ImagemNoticia")
                        .HasForeignKey("IdNoticia")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("NoticiaModel");
                });

            modelBuilder.Entity("COMTUR.Models.ImagemTurismoModel", b =>
                {
                    b.HasOne("COMTUR.Models.TurismoModel", "TurismoModel")
                        .WithMany("ImagemTurismo")
                        .HasForeignKey("IdTurismo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TurismoModel");
                });

            modelBuilder.Entity("COMTUR.Models.NoticiaModel", b =>
                {
                    b.HasOne("COMTUR.Models.TurismoModel", "TurismoModel")
                        .WithMany("Noticia")
                        .HasForeignKey("IdTurismo")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("COMTUR.Models.UsuarioModel", "UsuarioModel")
                        .WithMany("Noticia")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TurismoModel");

                    b.Navigation("UsuarioModel");
                });

            modelBuilder.Entity("COMTUR.Models.SessaoModel", b =>
                {
                    b.HasOne("COMTUR.Models.UsuarioModel", "UsuarioModel")
                        .WithMany()
                        .HasForeignKey("UsuarioModelId");

                    b.Navigation("UsuarioModel");
                });

            modelBuilder.Entity("COMTUR.Models.TurismoModel", b =>
                {
                    b.HasOne("COMTUR.Models.TipoTurismoModel", "TipoTurismoModel")
                        .WithMany()
                        .HasForeignKey("IdTipoTurismo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.UsuarioModel", "UsuarioModel")
                        .WithMany("Turismos")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("COMTUR.Models.TipoTurismoModel", null)
                        .WithMany("Turismo")
                        .HasForeignKey("TipoTurismoModelId");

                    b.Navigation("TipoTurismoModel");

                    b.Navigation("UsuarioModel");
                });

            modelBuilder.Entity("COMTUR.Models.AtracaoModel", b =>
                {
                    b.Navigation("ImagemAtracao");
                });

            modelBuilder.Entity("COMTUR.Models.EmpresaModel", b =>
                {
                    b.Navigation("AnuncioEmpresa");

                    b.Navigation("ImagemEmpresa");
                });

            modelBuilder.Entity("COMTUR.Models.NoticiaModel", b =>
                {
                    b.Navigation("ImagemNoticia");
                });

            modelBuilder.Entity("COMTUR.Models.TipoAtracaoModel", b =>
                {
                    b.Navigation("Atracao");
                });

            modelBuilder.Entity("COMTUR.Models.TipoTurismoModel", b =>
                {
                    b.Navigation("Anuncios");

                    b.Navigation("Turismo");
                });

            modelBuilder.Entity("COMTUR.Models.TurismoModel", b =>
                {
                    b.Navigation("Atracao");

                    b.Navigation("ImagemTurismo");

                    b.Navigation("Noticia");
                });

            modelBuilder.Entity("COMTUR.Models.UsuarioModel", b =>
                {
                    b.Navigation("Empresas");

                    b.Navigation("Noticia");

                    b.Navigation("Turismos");
                });
#pragma warning restore 612, 618
        }
    }
}
