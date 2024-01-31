using Microsoft.EntityFrameworkCore;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Repositorios
{
	public class AtracaoRepositorio : IAtracaoRepositorio
	{
		private readonly ComturDBContext _dbContext;
		public AtracaoRepositorio(ComturDBContext AtracaoDBContext)
		{
			_dbContext = AtracaoDBContext;
		}

		public async Task<AtracaoModel> BuscarPorId(int id)
		{
			return await _dbContext.Atracao.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<AtracaoModel> GetById(int id)
		{
			return await _dbContext.Atracao.Include(objeto => objeto.TipoAtracaoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<AtracaoModel>> BuscarAtracao()
		{
			return await _dbContext.Atracao.ToListAsync();
		}

		public async Task<AtracaoModel> Adicionar(AtracaoModel atracao)
		{
			await _dbContext.Atracao.AddAsync(atracao);
			await _dbContext.SaveChangesAsync();

			return atracao;
		}

		public async Task<AtracaoModel> Atualizar(AtracaoModel atracao, int id)
		{
			AtracaoModel AtracaoPorId = await BuscarPorId(id);
			if (AtracaoPorId == null)
			{
				throw new Exception($"Atração para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			AtracaoPorId.Id = atracao.Id;
			AtracaoPorId.Nome = atracao.Nome;
			AtracaoPorId.Descrição = atracao.Descrição;
			AtracaoPorId.QRCode = atracao.QRCode;

			_dbContext.Atracao.Update(AtracaoPorId);
			await _dbContext.SaveChangesAsync();

			return AtracaoPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			AtracaoModel AtracaoPorId = await BuscarPorId(id);
			if (AtracaoPorId == null)
			{
				throw new Exception($"Atração para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			_dbContext.Atracao.Remove(AtracaoPorId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}
}