using Microsoft.EntityFrameworkCore;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting.Internal;

namespace COMTUR.Repositorios
{
	public class AtracaoRepositorio : IAtracaoRepositorio
	{
		private readonly ComturDBContext _dbContext;
		private readonly IWebHostEnvironment _hostingEnvironment;
		public AtracaoRepositorio(ComturDBContext AtracaoDBContext, IWebHostEnvironment hostingEnvironment)
		{
			_dbContext = AtracaoDBContext;
			_hostingEnvironment = hostingEnvironment;
		}

		public async Task<AtracaoModel> BuscarPorId(int id)
		{
			return await _dbContext.Atracao.Include(n => n.ImagemAtracao).FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<AtracaoModel> GetById(int id)
		{
			return await _dbContext.Atracao.Include(objeto => objeto.TipoAtracaoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<AtracaoModel>> BuscarAtracao()
		{
			return await _dbContext.Atracao.Include(n => n.ImagemAtracao).ToListAsync();
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
			AtracaoPorId.Descricao = atracao.Descricao;
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

		public async Task<List<ImagemAtracaoModel>> BuscarImagensPorAtracaoId(int atracaoId)
		{
			// Use o Entity Framework para consultar as imagens associadas a uma atracao específica
			var imagens = await _dbContext.ImagemAtracao
										   .Where(imagem => imagem.IdAtracao == atracaoId)
										   .ToListAsync();
			return imagens;
		}
	}
}