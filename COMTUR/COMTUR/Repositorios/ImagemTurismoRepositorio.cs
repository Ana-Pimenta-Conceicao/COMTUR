using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class ImagemTurismoRepositorio : IImagemTurismoRepositorio
    {
        private readonly ComturDBContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ImagemTurismoRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _hostingEnvironment = webHostEnvironment;
        }

        public async Task<ImagemTurismoModel> BuscarPorId(int id)
        {
            return await _dbContext.ImagemTurismo.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ImagemTurismoModel> GetById(int id)
        {
            return await _dbContext.ImagemTurismo.Include(objeto => objeto.TurismoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<ImagemTurismoModel>> BuscarImagemTurismo()
        {
            return await _dbContext.ImagemTurismo.ToListAsync();
        }

        public async Task<ImagemTurismoModel> Adicionar(ImagemTurismoModel ImagemTurismo)
        {
            await _dbContext.ImagemTurismo.AddAsync(ImagemTurismo);
            await _dbContext.SaveChangesAsync();

            return ImagemTurismo;
        }

        public async Task<ImagemTurismoModel> Atualizar(ImagemTurismoModel ImagemTurismo, int id)
        {
            ImagemTurismoModel ImagemTurismoPorId = await BuscarPorId(id);
            if (ImagemTurismoPorId == null)
            {
                throw new Exception($"ImagemTurismo para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            // Atualiza a propriedade Imagem
            ImagemTurismoPorId.Imagem = ImagemTurismo.Imagem;

            // Verifica se o ID da Turismo associada foi alterado
            if (ImagemTurismoPorId.IdTurismo != ImagemTurismo.IdTurismo)
            {
                // Atualiza o ID da Turismo associada
                ImagemTurismoPorId.IdTurismo = ImagemTurismo.IdTurismo;
            }

            _dbContext.ImagemTurismo.Update(ImagemTurismoPorId);
            await _dbContext.SaveChangesAsync();

            return ImagemTurismoPorId;
        }


        public async Task<bool> Apagar(int id)
        {
            ImagemTurismoModel ImagemTurismoPorId = await BuscarPorId(id);
            if (ImagemTurismoPorId == null)
            {
                throw new Exception($"ImagemTurismo para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            _dbContext.ImagemTurismo.Remove(ImagemTurismoPorId);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}

