using Jose;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using System.Text;
using Newtonsoft.Json;
using COMTUR.Models;
using COMTUR.Data;

namespace COMTUR.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        private readonly ComturDBContext _dbContext;


        public LoginController(IUsuarioRepositorio usuarioRepositorio, ComturDBContext dbContext)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _dbContext = dbContext;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromForm] LoginModel loginModel)
        {
            if (loginModel is null) return BadRequest(new { autentication = false, message = "Dado inválido!" });
            var UsuarioModel = await _usuarioRepositorio.Autenticacao(loginModel);

            if (UsuarioModel is not null)
            {
                if (loginModel.Email == UsuarioModel.EmailUsuario && loginModel.Senha == UsuarioModel.SenhaUsuario)
                {
                    EntitySecurity entitySecurity = new EntitySecurity();
                    var token = GenerateToken(entitySecurity.Key, entitySecurity.Issuer, entitySecurity.Audience, UsuarioModel.EmailUsuario, 12);
                    // Após gerar o token com sucesso
                    SessaoModel sessao = new SessaoModel
                    {
                        TokenSessao = token,
                        StatusSessao = true, // Assumindo que a sessão está ativa após a autenticação
                        EmailUsuario = UsuarioModel.EmailUsuario,
                        NomeUsuario = UsuarioModel.Nome,
                        NivelAcesso = UsuarioModel.TipoUsuario.ToString(),
                        IdUsuario = UsuarioModel.Id // Supondo que IdUsuario seja o ID do usuário
                    };

                    // Adicione a sessão ao contexto
                    _dbContext.Sessao.Add(sessao); // Ou _sessaoRepositorio.Adicionar(sessao);
                    await _dbContext.SaveChangesAsync(); // Ou _sessaoRepositorio.SalvarAsync();

                    return Ok(new { autentication = true, message = new { tokenUsuario = token, tipoUsuario = UsuarioModel.TipoUsuario, nome = UsuarioModel.Nome, id = UsuarioModel.Id } });
                }
            }

            return Unauthorized(new { autentication = false, message = "E-mail ou senha incorretos!" });
        }


        private static string GenerateToken(string secretKey, string issuer, string audience, string subject, int expiryInHours)
        {
            var payload = new Dictionary<string, object>
            {
                { "iss", issuer },
                { "aud", audience },
                { "sub", subject },
                { "exp", DateTimeOffset.UtcNow.AddHours(expiryInHours).ToUnixTimeSeconds() }
            };

            string token = JWT.Encode(payload, Encoding.UTF8.GetBytes(secretKey), JwsAlgorithm.HS256);
            return token;
        }

        [HttpPost("Validation")]
        public ActionResult Validation([FromForm] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(0);
            }

            EntitySecurity entitySecurity = new EntitySecurity();
            if (ValidateToken(token, entitySecurity.Issuer, entitySecurity.Audience, _usuarioRepositorio))
            {
                // Consulte o banco de dados para verificar se o token existe e está ativo
                var sessao = _dbContext.Sessao.FirstOrDefault(s => s.TokenSessao == token && s.StatusSessao);
                if (sessao != null)
                {
                    return Ok(new { validation = "true" });
                }
                else
                {
                    return Unauthorized(new { validation = "false", message = "Token de sessão inválido ou expirado!" });
                }
            }
            else
            {
                return Unauthorized(new { validation = "false", message = "Token JWT inválido!" });
            }
        }

        private static bool ValidateToken(string token, string issuer, string audience, IUsuarioRepositorio usuarioRepositorio)
        {
            // Passo 1: Verificar se o token tem três partes
            string[] tokenParts = token.Split('.');
            if (tokenParts.Length != 3)
            {
                return false;
            }

            try
            {
                // Passo 2: Decodificar o token
                string decodedToken = Encoding.UTF8.GetString(Base64Url.Decode(tokenParts[1]));

                // Passo 3: Verificar iss, aud e sub
                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
                if (!payload.TryGetValue("iss", out object issuerClaim) ||
                    !payload.TryGetValue("aud", out object audienceClaim) ||
                    !payload.TryGetValue("sub", out object subjectClaim))
                {
                    return false;
                }

                if (issuerClaim.ToString() != issuer || audienceClaim.ToString() != audience)
                {
                    return false;
                }

                UsuarioModel usuario = usuarioRepositorio.BuscarPorEmail(subjectClaim.ToString()).Result; // Esperar a tarefa ser concluída
                if (usuario is null)
                {
                    return false;
                }

                // Passo 4: Verificar se o tempo expirou
                if (payload.TryGetValue("exp", out object expirationClaim))
                {
                    long expirationTime = long.Parse(expirationClaim.ToString());
                    var expirationDateTime = DateTimeOffset.FromUnixTimeSeconds(expirationTime).UtcDateTime;
                    if (expirationDateTime < DateTime.UtcNow)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

                // Passo 5: Se tudo estiver certo
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost("Logout")]
        public async Task<ActionResult> Logout([FromForm] string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(0);
            }

            var sessao = _dbContext.Sessao.FirstOrDefault(s => s.TokenSessao == token);
            if (sessao != null)
            {
                sessao.StatusSessao = false; // Desativa a sessão
                await _dbContext.SaveChangesAsync(); // Salva as alterações no banco de dados
                return Ok(new { message = "Logout realizado com sucesso!" });
            }
            else
            {
                return Unauthorized(new { message = "Token de sessão inválido!" });
            }
        }
    }
}