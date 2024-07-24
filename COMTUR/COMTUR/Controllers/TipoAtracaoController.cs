using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;
using Azure;
using COMTUR.Models.Enum;
using COMTUR.Models.StatusState;
using Response = COMTUR.Models.StatusState.Response;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class TipoAtracaoController : ControllerBase
	{
		private readonly ITipoAtracaoRepositorio _TipoAtracaoRepositorio;
		private readonly Response _response;

		public TipoAtracaoController(ITipoAtracaoRepositorio TipoAtracaoRepositorio)
		{
			_TipoAtracaoRepositorio = TipoAtracaoRepositorio;
			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<List<TipoAtracaoModel>>> BuscarTipoAtracao()
		{
			List<TipoAtracaoModel> tipoAtracao = await _TipoAtracaoRepositorio.BuscarTipoAtracao();
			return Ok(tipoAtracao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> BuscarPorId(int id)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.BuscarPorId(id);
			return Ok(tipoAtracao);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorIdUsuario(int id)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.GetByIdUsuario(id);
			if (tipoAtracao == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(tipoAtracao);
		}

		[HttpPost]
		public async Task<ActionResult<TipoAtracaoModel>> Cadastrar([FromBody] TipoAtracaoModel tipoAtracaoModel)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Adicionar(tipoAtracaoModel);

			return Ok(tipoAtracao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> Atualizar([FromBody] TipoAtracaoModel tipoAtracaoModel, int id)
		{
			tipoAtracaoModel.Id = id;
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

			return Ok(tipoAtracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _TipoAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}

		[HttpPut("{id:int}/Ativar")]
		public async Task<ActionResult<TipoAtracaoModel>> Activity(int id)
		{
			try
			{
				var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id);
				if (tipoAtracaoModel == null)
				{
					_response.SetNotFound();
					_response.Message = "Tipo Atracao não encontrado!";
					_response.Data = new { errorId = "Tipo Atracao não encontrado!" };
					return NotFound(_response);
				}
				else if (tipoAtracaoModel.Status == TipoStatus.Aprovado)
				{
					_response.SetSuccess();
					_response.Message = "O Tipo Atracao já está " + tipoAtracaoModel.GetState().ToLower() + ".";
					_response.Data = tipoAtracaoModel;
					return Ok(_response);
				}
				else
				{
					tipoAtracaoModel.Approved();
					await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

					_response.SetSuccess();
					_response.Message = "Tipo Atracao " + tipoAtracaoModel.GetState().ToLower() + " com sucesso.";
					_response.Data = tipoAtracaoModel;
					return Ok(_response);
				}
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível ativar o Tipo Atracao!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<TipoAtracaoModel>> Desactivity(int id)
		{
			try
			{
				var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id);
				if (tipoAtracaoModel is null)
				{
					_response.SetNotFound();
					_response.Message = "Tipo Atracao não encontrado!";
					_response.Data = new { errorId = "Tipo Atracao não encontrado!" };
					return NotFound(_response);
				}
				else if (tipoAtracaoModel.Status == TipoStatus.Aprovado)
				{
					_response.SetSuccess();
					_response.Message = "O Tipo Atracao já está " + tipoAtracaoModel.GetState().ToLower() + ".";
					_response.Data = tipoAtracaoModel;
					return Ok(_response);
				}
				else
				{
					tipoAtracaoModel.Approved();
					await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

					_response.SetSuccess();
					_response.Message = "Tipo Atracao " + tipoAtracaoModel.GetState().ToLower() + " com sucesso.";
					_response.Data = tipoAtracaoModel;
					return Ok(_response);
				}
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível desativar o Tipo Atracao!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}
	}
}