using COMTUR.Data;
using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Repositorios
{
	public class TipoTurismoRepositorio : ITipoTurismoRepositorio
	{

		private readonly ComturDBContext _dBContext;

		public TipoTurismoRepositorio(ComturDBContext dBContext)
		{
			_dBContext = dBContext;
		}

		public async Task<TipoTurismoModel> BuscarPorId(int id)
		{
			return await _dBContext.TipoTurismo.FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<List<TipoTurismoModel>> BuscarTodosTipoTurismo()
		{
			return await _dBContext.TipoTurismo.ToListAsync();
		}
		public async Task<TipoTurismoModel> Adicionar(TipoTurismoModel tipo)
		{
			await _dBContext.TipoTurismo.AddAsync(tipo);
			await _dBContext.SaveChangesAsync();

			return tipo;
		}
		public async Task<TipoTurismoModel> Atualizar(TipoTurismoModel tipo, int id)
		{
			TipoTurismoModel tipoTurismoPorId = await BuscarPorId(id);

			if (tipoTurismoPorId == null)
			{
				throw new Exception($"Tipo de Turismo {id} não foi encontrado");
			}

			tipoTurismoPorId.Id = tipo.Id;
			tipoTurismoPorId.Nome = tipo.Nome;
			tipoTurismoPorId.Imagem = tipo.Imagem;

			_dBContext.TipoTurismo.Update(tipoTurismoPorId);
			await _dBContext.SaveChangesAsync();

			return tipoTurismoPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			TipoTurismoModel tipoTurismoPorId = await BuscarPorId(id);

			if (tipoTurismoPorId == null)
			{
				throw new Exception($"Tipo de Turismo {id} não foi encontrado");
			}

			_dBContext.TipoTurismo.Remove(tipoTurismoPorId);
			await _dBContext.SaveChangesAsync();

			return true;
		}
	}
}