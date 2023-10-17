using COMTUR.Data;
using COMTUR.Models;
using Microsoft.EntityFrameworkCore;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Repositorios
{
	public class RamoEmpresaRepositorio : IRamoEmpresaRepositorio
	{

		private readonly ComturDBContext _dBContext;

		public RamoEmpresaRepositorio(ComturDBContext dBContext)
		{
			_dBContext = dBContext;
		}

		public async Task<RamoEmpresaModel> BuscarPorId(int id)
		{
			return await _dBContext.RamoEmpresa.FirstOrDefaultAsync(t => t.Id == id);
		}

		public async Task<List<RamoEmpresaModel>> BuscarRamoEmpresa()
		{
			return await _dBContext.RamoEmpresa.ToListAsync();
		}
		public async Task<RamoEmpresaModel> Adicionar(RamoEmpresaModel ramo)
		{
			await _dBContext.RamoEmpresa.AddAsync(ramo);
			await _dBContext.SaveChangesAsync();

			return ramo;
		}
		public async Task<RamoEmpresaModel> Atualizar(RamoEmpresaModel ramo, int id)
		{
			RamoEmpresaModel ramoEmpresaPorId = await BuscarPorId(id);

			if (ramoEmpresaPorId == null)
			{
				throw new Exception($"Ramo da empresa {id} não foi encontrado");
			}

			ramoEmpresaPorId.Id = ramo.Id;
			ramoEmpresaPorId.Nome = ramo.Nome;

			_dBContext.RamoEmpresa.Update(ramoEmpresaPorId);
			await _dBContext.SaveChangesAsync();

			return ramoEmpresaPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			RamoEmpresaModel ramoEmpresaPorId = await BuscarPorId(id);

			if (ramoEmpresaPorId == null)
			{
				throw new Exception($"Ramo da empresa {id} não foi encontrado");
			}

			_dBContext.RamoEmpresa.Remove(ramoEmpresaPorId);
			await _dBContext.SaveChangesAsync();

			return true;
		}
	}
}

