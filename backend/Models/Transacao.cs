using backend.utils;
using System.ComponentModel.DataAnnotations;

// minha entidade/modelo pra representar as transações no sistema
namespace backend.Models
{
    public class Transacao
    {
        [Key]
        public int Id {get; set;}

        public string? Descricao {get; set;}

        //eu usei o tipo decimal ao invés do float para evitar falhas de arredondamento em cálculos
        public decimal Valor {get; set;}

        //pra evitar que o usuario coloque dados diferente de Dispesa ou Receita, preferi usar um Enum
        public TipoTransacaoEnum TipoTransacao {get; set;}

        // aq seria o relacionamento com Pessoa
        //chave estrangeira
        public int MoradorId { get; set; }
        public Pessoa? Morador {get; set;}
    }
}