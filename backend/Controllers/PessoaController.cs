using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.utils;
using System.Linq;
using System.Transactions;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        // aq eu estou injetando a dependência considerando que eu preciso acessar o SQLite para receber o banco pronto do Program.cs
        private readonly BdContext bd;

        public PessoaController(BdContext bd)
        {
            this.bd = bd;
        }


        //endpoint da listagem
        [HttpGet]
        public IActionResult RecuperarPessoas()
        {
            // aq eu estou indo ao meu banco, pegando a tabela pessoa, transformando em uma lista e retornando um http 200, ja convertido em um json
            var ListagemPessoa = bd.Pessoa.ToList();

            return Ok(ListagemPessoa);
        }


        //endpoint da criação
        [HttpPost]
        public IActionResult CriarPessoa([FromBody] Pessoa pessoa)
        {

            if (pessoa == null)
            {
                return BadRequest("Os dados da pessoa não podem ser nulos.");
            }

            //aq estou capturando o obj que chegou e salvando na lista de Pessoa
            bd.Pessoa.Add(pessoa);

            //depois eu salvo essa nova informação no SQLite
            bd.SaveChanges();

            //e por fim, retorno o obj de volta pra avisar que o ID foi gerado
            return Ok(pessoa);
        }


        //endpoint da deleção
        [HttpDelete("{idPessoa}")]
        public IActionResult DeletarPessoa(int idPessoa)
        {
            //estou recuperando a pessoa que tenha esse ID
            
            var pessoa = bd.Pessoa.Find(idPessoa);
            //verifico se ela existe
            if (pessoa == null)
            {
                return NotFound("Pessoa nao encontrada");
            }

            //depois eu removo ela do banco de dados e salvo a alteração
            bd.Pessoa.Remove(pessoa);
            bd.SaveChanges();

            return Ok(new { mensagem ="Pessoa apagada"});
            
        }

        // listagem total

        [HttpGet("totais")] //como eu ja tenho um httpget, preciso dar um nome diferente pra esse
        public IActionResult ListarTotal()
        {
            // aq to buscando as pessoas e carregando as transações juntos com os dados das pessoas, ou seja, usando as duas tabelas
            var dadosDoBanco = bd.Pessoa.Include(p => p.Transacoes).ToList();

            var total = dadosDoBanco.Select(p => new
            {
                //chamando os dados da pessoa
                p.Id,
                p.Nome,
                p.Idade,

                //filtrei por tipo e somei em seguida
                TotalReceita = p.Transacoes
                    .Where(trans => trans.TipoTransacao == TipoTransacaoEnum.Receita)
                    .Sum(trans => trans.Valor),

                TotalDespesas = p.Transacoes
                        .Where(trans => trans.TipoTransacao == TipoTransacaoEnum.Despesa)
                        .Sum(trans => trans.Valor),

                //ai ele so vai gerar o saldo
                SaldoLiquido = p.Transacoes.Where(trans => trans.TipoTransacao == TipoTransacaoEnum.Receita).Sum(trans =>trans.Valor) - 
                p.Transacoes.Where(trans => trans.TipoTransacao == TipoTransacaoEnum.Despesa).Sum(trans =>trans.Valor)

            }).ToList();

            return Ok(total);
        }

    }
}