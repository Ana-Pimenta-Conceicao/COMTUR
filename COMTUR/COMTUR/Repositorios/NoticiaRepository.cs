using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace COMTUR.Repositorios
{
    public class NoticiaRepository : INoticiaRepository
    {
        private readonly ComturDBContext _dbContext;

        private readonly IWebHostEnvironment _hostingEnvironment;

        //private string _caminhoImagens = AppContext.BaseDirectory;

        public NoticiaRepository(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _hostingEnvironment = webHostEnvironment;
        }

        public async Task<NoticiaModel> BuscarPorId(int id)
        {
            return await _dbContext.Noticia.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<NoticiaModel>> BuscarNoticia()
        {
            return await _dbContext.Noticia.ToListAsync();
        }

        public async Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel)
        {
            await _dbContext.Noticia.AddAsync(noticiaModel);
            await _dbContext.SaveChangesAsync();

            return noticiaModel;
        }

        public async Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, int id)
        {
            NoticiaModel noticiaPorId = await BuscarPorId(id);

            if (noticiaPorId == null)
            {
                throw new Exception($"Noticia {id} nao foi encontrado no banco de dados. ");
            }

            noticiaPorId.Id = noticiaModel.Id;
            noticiaPorId.Titulo = noticiaModel.Titulo;
            noticiaPorId.Subtitulo = noticiaModel.Subtitulo;
            noticiaPorId.Conteudo = noticiaModel.Conteudo;
            noticiaPorId.DataPublicacao = noticiaModel.DataPublicacao;
            noticiaPorId.HoraPublicacao = noticiaModel.HoraPublicacao;

            _dbContext.Noticia.Update(noticiaPorId);
            await _dbContext.SaveChangesAsync();

            return noticiaPorId;
        }

        public async Task<bool> Apagar(int id, IWebHostEnvironment hostingEnvironment)
        {
            var noticiaParaExcluir = await BuscarPorId(id);

            if (noticiaParaExcluir == null)
            {
                return false;
            }

            // Excluir a imagem associada
            string imagePath = Path.Combine("Imagens", noticiaParaExcluir.CaminhoImagem);
            await ExcluirImagem(imagePath, hostingEnvironment);

            _dbContext.Noticia.Remove(noticiaParaExcluir);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<string> SalvarImagem(IFormFile imagem, IWebHostEnvironment hostingEnvironment)
        {
            if (imagem == null || imagem.Length == 0)
                return null;

            var path = Path.Combine(hostingEnvironment.WebRootPath, "imagens", imagem.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            return path;
        }

        public async Task<string> ExcluirImagem(string imagePath, IWebHostEnvironment hostingEnvironment)
        {
            string caminhoImagem = Path.Combine(hostingEnvironment.WebRootPath, imagePath);

            if (System.IO.File.Exists(caminhoImagem))
            {
                System.IO.File.Delete(caminhoImagem);
                return Path.Combine("imagens", imagePath);
            }

            return null;
        }

        public async Task<byte[]> ObterImagem(string imagePath)
        {
            var path = Path.Combine(_hostingEnvironment.WebRootPath, "imagens", imagePath);

            if (System.IO.File.Exists(path))
            {
                return System.IO.File.ReadAllBytes(path);
            }

            return null;
        }
    }
}
