using AutoMapper;
using COMTUR.Data;
using COMTUR.Models.Enum;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class MembroRepositorio : IMembroRepositorio
    {
        private readonly IMembroRepositorio _MembroRepositorio;
        private readonly IMapper _mapper;
        private readonly ComturDBContext _dbContext;

        public MembroRepositorio(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<MembroModel> BuscarMembroPorId(int id)
        {
            return await _dbContext.Membro.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

 

        public async Task<List<MembroModel>> BuscarMembro()
        {
            return await _dbContext.Membro.ToListAsync();
        }

      

        public async Task<MembroModel> Adicionar(MembroModel membroModel)
        {
            await _dbContext.Membro.AddAsync(membroModel);
            await _dbContext.SaveChangesAsync();

            return membroModel;
        }

        public async Task<MembroModel> Atualizar(MembroModel membroModel, int id)
        {
            MembroModel membroPorId = await BuscarMembroPorId(id);
            if (membroPorId == null)
            {
                throw new Exception($"Membro {id} não foi encontrado no banco de dados.");
            }

          
            membroPorId.Nome = membroModel.Nome;
            membroPorId.Cargo = membroModel.Cargo;
            membroPorId.Imagem = membroModel.Imagem;
            
            _dbContext.Membro.Update(membroPorId);
            await _dbContext.SaveChangesAsync();

            return membroPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            MembroModel MembroPorId = await BuscarMembroPorId(id);

            if (MembroPorId == null)
            {
                throw new Exception($"Membro {id} não foi encontrado");
            }

            _dbContext.Membro.Remove(MembroPorId);
            await _dbContext.SaveChangesAsync();

            return true;
        }

       

      
    }
}
