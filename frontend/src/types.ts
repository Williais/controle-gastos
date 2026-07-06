export const TipoTransacaoEnum = {
  Receita: 0,
  Despesa: 1
} as const;

export type TipoTransacaoEnum = (typeof TipoTransacaoEnum)[keyof typeof TipoTransacaoEnum];

export interface Pessoa {
  id?: number;
  nome: string;
  idade: number;
}

export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipoTransacao: TipoTransacaoEnum;
  moradorId: number;
}

export interface PessoaTotal extends Pessoa {
  totalReceita: number;
  totalDespesas: number;
  saldoLiquido: number;
}