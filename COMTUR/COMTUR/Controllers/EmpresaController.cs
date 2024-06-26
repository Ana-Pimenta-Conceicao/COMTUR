﻿using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmpresaController : ControllerBase
	{
		private readonly IEmpresaRepositorio _empresaRepositorio;
		private readonly IImagemEmpresaRepositorio _imagemEmpresaRepositorio;


		public EmpresaController(IEmpresaRepositorio EmpresaRepositorio, IImagemEmpresaRepositorio imagemEmpresaRepositorio)
		{
			_empresaRepositorio = EmpresaRepositorio;
			_imagemEmpresaRepositorio = imagemEmpresaRepositorio;
		}

		/*[HttpGet("porTipoStatus/{tipoStatus}")]
		public async Task<ActionResult<IEnumerable<EmpresaModel>>> GetEmpresaPorTipo(int tipoStatus)
		{
			var empresas = await _empresaRepositorio.ListarPorTipoStatus(tipoStatus);

			if (empresas == null)
			{
				return NotFound();
			}

			return Ok(empresas);
		}*/

		[HttpPost("{empresaId}/imagens")]
		public IActionResult AdicionarImagem(int empresaId, [FromForm] ImagemEmpresaModel imagem)
		{
			imagem.IdEmpresa = empresaId;
			_imagemEmpresaRepositorio.Adicionar(imagem);
			return Ok();
		}

		[HttpGet("{id}/tipoturismo")]
		public async Task<ActionResult<EmpresaModel>> BuscarPorIdTipoTurismo(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.GetByIdTipoTurismo(id);
			if (empresa == null)
			{
				return NotFound($"Tipo Turismo com ID {id} não encontrada.");
			}
			return Ok(empresa);
		}

		[HttpGet]
		public async Task<ActionResult<List<EmpresaModel>>> BuscarEmpresa()
		{
			List<EmpresaModel> empresas = await _empresaRepositorio.BuscarEmpresa();
			return Ok(empresas);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<EmpresaModel>> BuscarPorId(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.BuscarPorId(id);
			if (empresa == null)
			{
				return NotFound($"Empresa com ID {id} não encontrada.");
			}
			return Ok(empresa);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<EmpresaModel>> BuscarPorIdUsuario(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.GetById(id);
			if (empresa == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(empresa);
		}

		[HttpGet("{id}/imagens")]
		public async Task<ActionResult<List<string>>> BuscarImagensPorEmpresaId(int empresaId)
		{
			var imagens = await _empresaRepositorio.BuscarImagensPorEmpresaId(empresaId);
			return Ok(imagens);
		}

		[HttpPost]
		public async Task<ActionResult<EmpresaModel>> Cadastrar([FromForm] EmpresaModel empresaModel)
		{
			EmpresaModel empresa = await _empresaRepositorio.Adicionar(empresaModel);

			return Ok(empresa);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<EmpresaModel>> Atualizar([FromForm] EmpresaModel empresaModel, int id)
		{
			empresaModel.Id = id;
			EmpresaModel empresa = await _empresaRepositorio.Atualizar(empresaModel, id);

			return Ok(empresa);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EmpresaModel>> Apagar(int id)
		{
			bool apagado = await _empresaRepositorio.Apagar(id);

			return Ok(apagado);
		}
	}
}