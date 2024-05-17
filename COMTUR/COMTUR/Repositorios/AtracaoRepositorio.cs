using Microsoft.EntityFrameworkCore;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting.Internal;
using COMTUR.Models.Enum;

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

		public async Task<AtracaoModel> GetByIdTipoAtracao(int id)
		{
			return await _dbContext.Atracao.Include(objeto => objeto.TipoAtracaoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AtracaoModel> GetByIdTurismo(int id)
		{
			return await _dbContext.Atracao.Include(objeto => objeto.TurismoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AtracaoModel> GetByIdUsuario(int id)
		{
			return await _dbContext.Atracao.Include(objeto => objeto.UsuarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<AtracaoModel>> BuscarAtracao()
		{
			return await _dbContext.Atracao.Include(n => n.ImagemAtracao).ToListAsync();
		}

		/*public async Task<List<AtracaoModel>> ListarPorTipoStatus(int tipoStatus)
		{
			return await _dbContext.Atracao
				.Where(x => (int)x.TipoStatus == tipoStatus)
				.ToListAsync();
		}*/

		public async Task<AtracaoModel> Adicionar(AtracaoModel atracao)
		{
			/*if (!Enum.IsDefined(typeof(TipoStatus), atracao.TipoStatus))
			{
				throw new ArgumentException("Tipo de status inválido");
			}*/

			await _dbContext.Atracao.AddAsync(atracao);
			await _dbContext.SaveChangesAsync();

			return atracao;
		}

		public async Task<AtracaoModel> Atualizar(AtracaoModel atracao, int id)
		{
			AtracaoModel atracaoPorId = await BuscarPorId(id);

			if (atracaoPorId == null)
			{
				throw new Exception($"Atração para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			/*if (!Enum.IsDefined(typeof(TipoStatus), atracao.TipoStatus))
			{
				throw new ArgumentException("Tipo de status inválido");
			}*/

			atracaoPorId.Id = atracao.Id;
			atracaoPorId.Nome = atracao.Nome;
			atracaoPorId.Descricao = atracao.Descricao;
			atracaoPorId.QRCode = atracao.QRCode;
            atracaoPorId.IdTipoAtracao = atracao.IdTipoAtracao;
			atracaoPorId.IdUsuario = atracao.IdUsuario;
            //AtracaoPorId.TipoStatus = atracao.TipoStatus; 

            _dbContext.Atracao.Update(atracaoPorId);
			await _dbContext.SaveChangesAsync();

			return atracaoPorId;
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