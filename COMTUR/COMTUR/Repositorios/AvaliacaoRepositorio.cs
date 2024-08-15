using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class AvaliacaoRepositorio : IAvaliacaoRepositorio
	{
		private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;
		private readonly IMapper _mapper;
		private readonly ComturDBContext _dbContext;

		public AvaliacaoRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<AvaliacaoModel> BuscarPorId(int id)
		{
			return await _dbContext.Avaliacao.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoModel> Adicionar(AvaliacaoModel Avaliacao)
		{

			await _dbContext.Avaliacao.AddAsync(Avaliacao);
			await _dbContext.SaveChangesAsync();

			return Avaliacao;
		}

		public async Task<bool> Apagar(int id)
		{
			AvaliacaoModel AvaliacaoPorId = await BuscarPorId(id);

			if (AvaliacaoPorId == null)
			{
				throw new Exception($"Avaliação {id} não encontrada");
			}

			_dbContext.Avaliacao.Remove(AvaliacaoPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<AvaliacaoModel> Atualizar(AvaliacaoModel Avaliacao, int id)
		{
			AvaliacaoModel avaliacaoPorId = await BuscarPorId(id);

			if (avaliacaoPorId == null)
			{
				throw new Exception($"Avaliação para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			avaliacaoPorId.Id = Avaliacao.Id;
			avaliacaoPorId.Nota =Avaliacao.Nota;
			avaliacaoPorId.DataAvaliacao =Avaliacao.DataAvaliacao;
			avaliacaoPorId.Comentario =Avaliacao.Comentario;

			_dbContext.Avaliacao.Update(avaliacaoPorId);
			await _dbContext.SaveChangesAsync();

			return avaliacaoPorId;
		}

		public async Task<List<AvaliacaoModel>> BuscarAvaliacao()
		{
			return await _dbContext.Avaliacao.ToListAsync();
		}

		public async Task<AvaliacaoModel> BuscarIdAtracao(int id)
		{
			return await _dbContext.Avaliacao.Include(objeto => objeto.AtracaoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoModel> BuscarIdTurismo(int id)
		{
			return await _dbContext.Avaliacao.Include(objeto => objeto.TurismoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoModel> BuscarIdUsuario(int id)
		{
			return await _dbContext.Avaliacao.Include(objeto => objeto.UsuarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}
	}
}
