import React, { useState } from 'react';
import { TipoTransacaoEnum, type Pessoa, type Transacao, type PessoaTotal } from './types';
import './App.css';

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<'moradores' | 'transacoes' | 'totais'>('moradores');

  const [moradores, setMoradores] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [totais, setTotais] = useState<PessoaTotal[]>([]);

  const [nomePessoa, setNomePessoa] = useState('');
  const [idadePessoa, setIdadePessoa] = useState<number | ''>('');

  const [descricaoTransacao, setDescricaoTransacao] = useState('');
  const [valorTransacao, setValorTransacao] = useState<number | ''>('');
  const [tipoTransacao, setTipoTransacao] = useState<TipoTransacaoEnum>(TipoTransacaoEnum.Receita);
  const [moradorSelecionadoId, setMoradorSelecionadoId] = useState<number | ''>('');

  const carregarMoradores = async () => {
    // requisiçao GET para /api/Pessoa
    try{
      const url = await fetch("http://localhost:5085/api/Pessoa")
      const dados = await url.json() 
      setMoradores(dados)
    }catch(e){
      console.error("erro ao buscar", e)
      alert("nao foi possivel conectar ao servidor. o server ta rodando???")
    }
  };

  const carregarTransacoes = async () => {
    // requisiçao GET para /api/Transacao

    try {
      const resposta = await fetch("http://localhost:5085/api/Transacao")
      const dados = await resposta.json()

      setTransacoes(dados)
    } catch (e) {
      console.error("erro ao buscar transações", e)
      alert("nao foi possivel conectar ao servidor. o server ta rodando???")
    }
  };

  const carregarTotais = async () => {
    // requisiçao GET para /api/Pessoa/totais
    try {
      const resposta = await fetch("http://localhost:5085/api/Pessoa/totais")
      const dados = await resposta.json()

      setTotais(dados)
    } catch (e) {
      console.error("erro ao buscar o total", e)
      alert("nao foi possivel conectar ao servidor. o server ta rodando???")
    }
  };

  const handleCriarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    //requisição POST para /api/Pessoa
    const dadosPessoa = {
      nome: nomePessoa,
      idade: idadePessoa
    }

    try {
      const url = await fetch("http://localhost:5085/api/Pessoa", {
        method: 'POST',
        headers: {
              "Content-Type": "application/json"
          },
        body: JSON.stringify(dadosPessoa)
      })
      
      if (!url.ok) {
            // se o backend retornou 400
            const mensagemErro = await url.text();
            alert(`o backend recusou a criação: ${mensagemErro}`);
            return;
      }

      console.log('Pessoa criada com sucesso:', dadosPessoa);

      //limpando os campos do formulrio
      setIdadePessoa("")
      setNomePessoa("")

      carregarMoradores() // atualizando a lista na tela
    } catch (e) {
      console.error("erro ao criar pessoa", e);
    }
  };

  const handleCriarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    //requisiçao POST para /api/Transacao

    try {
      const dadosTransacao = {
        descricao: descricaoTransacao,
        valor: valorTransacao,
        tipoTransacao: tipoTransacao,
        MoradorId: moradorSelecionadoId
      }

      const url = await fetch("http://localhost:5085/api/Transacao", {
         method: 'POST',
        headers: {
              "Content-Type": "application/json"
          },
        body: JSON.stringify(dadosTransacao)
      })

      if (!url.ok) {
            // se o backend retornou 400
            const mensagemErro = await url.text();
            alert(`o backend recusou a criação: ${mensagemErro}`);
            return;
      }

      console.log('Transação criada com sucesso:', dadosTransacao);

      setDescricaoTransacao('')
      setMoradorSelecionadoId('')
      setValorTransacao('')
      setTipoTransacao(TipoTransacaoEnum.Receita)

      carregarTransacoes()

    } catch (e) {
      console.error('erro ao criar transação', e)
    }
  };

  const handleDeletarPessoa = async (id: number) => {
      //requisição DELETE para /api/Pessoa/{id}

      const confirmar = window.confirm("certeza que deseja excluir este morador e todas as suas transações, Chefe?");
    if (!confirmar) {return};

      try {

        const url = await fetch(`http://localhost:5085/api/Pessoa/${id}`, {
          method: 'DELETE'
        })

        if (!url.ok) {
            // se o backend retornou 400
            const mensagemErro = await url.text();
            alert(`o backend recusou a Deleção: ${mensagemErro}`);
            return;
      }
        
        console.log('Pessoa apagada');

        carregarMoradores(); 
        carregarTotais();
      } catch (e) {
        console.error('erro ao deletar pessoa', e)
      }
  };

  return (
    <div className="container">
      <header className="main-header">
        <h1>Controle de Gastos Familiar</h1>
        <p>Moradores, receitas, despesas e saldos</p>
      </header>

      <nav className="nav-tabs">
        <button 
          className={abaAtiva === 'moradores' ? 'active' : ''} 
          onClick={() => { setAbaAtiva('moradores'); carregarMoradores(); }}
        >
          Moradores
        </button>
        <button 
          className={abaAtiva === 'transacoes' ? 'active' : ''} 
          onClick={() => { setAbaAtiva('transacoes'); carregarTransacoes(); carregarMoradores(); }}
        >
          Transações
        </button>
        <button 
          className={abaAtiva === 'totais' ? 'active' : ''} 
          onClick={() => { setAbaAtiva('totais'); carregarTotais(); }}
        >
          Painel de Totais
        </button>
      </nav>

      <main className="content-area">
        {abaAtiva === 'moradores' && (
          <div className="grid-section">
            <div className="cardform">
              <h3>Cadastrar Novo Morador</h3>
              <form onSubmit={handleCriarPessoa}>
                <div className="form-group">
                  <label>Nome do Morador</label>
                  <input 
                    type="text" 
                    value={nomePessoa} 
                    onChange={(e) => setNomePessoa(e.target.value)} 
                    placeholder="Willian Padilha"
                  />
                </div>
                <div className="form-group">
                  <label>Idade</label>
                  <input 
                    type="number" 
                    value={idadePessoa} 
                    onChange={(e) => setIdadePessoa(e.target.value !== '' ? Number(e.target.value) : '')} 
                    placeholder="Ex: 25"
                  />
                </div>
                <button type="submit" className="btn-primary">Salvar Morador</button>
              </form>
            </div>

            <div className="card-list">
              <h3>Moradores Cadastrados</h3>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {moradores.length === 0 ? (
                    <tr><td colSpan={4} className="text-center">Nenhum morador encontrado.</td></tr>
                  ) : (
                    moradores.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.nome}</td>
                        <td>{m.idade} anos</td>
                        <td>
                          <button onClick={() => m.id && handleDeletarPessoa(m.id)} className="btn-danger">
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {abaAtiva === 'transacoes' && (
          <div className="grid-section">
            <div className="card-form">
              <h3>Nova Transação</h3>
              <form onSubmit={handleCriarTransacao}>
                <div className="form-group">
                  <label>Descrição</label>
                  <input 
                    type="text" 
                    value={descricaoTransacao} 
                    onChange={(e) => setDescricaoTransacao(e.target.value)}
                    placeholder="Conta de Luz, Salário..."
                  />
                </div>
                <div className="form-group">
                  <label>Valor (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={valorTransacao} 
                    onChange={(e) => setValorTransacao(e.target.value !== '' ? Number(e.target.value) : '')}
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group">
                  <label>Tipo de Movimentação</label>
                  <select 
                    value={tipoTransacao} 
                    onChange={(e) => setTipoTransacao(Number(e.target.value) as TipoTransacaoEnum)}
                  >
                    <option value={TipoTransacaoEnum.Receita}>Receita (Entrada)</option>
                    <option value={TipoTransacaoEnum.Despesa}>Despesa (Saída)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vincular ao Morador</label>
                  <select 
                    value={moradorSelecionadoId} 
                    onChange={(e) => setMoradorSelecionadoId(e.target.value !== '' ? Number(e.target.value) : '')}
                  >
                    <option value="">Selecione um morador...</option>
                    {moradores.map(m => (
                      <option key={m.id} value={m.id}>{m.nome} ({m.idade} anos)</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary">Lançar Transação</button>
              </form>
            </div>

            <div className="card-list">
              <h3>Histórico de Transações</h3>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>ID Morador</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.length === 0 ? (
                    <tr><td colSpan={5} className="text-center">Nenhuma transação lançada.</td></tr>
                  ) : (
                    transacoes.map((t) => (
                      <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.descricao}</td>
                        <td className={t.tipoTransacao === TipoTransacaoEnum.Receita ? 'text-success' : 'text-danger'}>
                          R$ {t.valor.toFixed(2)}
                        </td>
                        <td>
                          <span className={`badge ${t.tipoTransacao === TipoTransacaoEnum.Receita ? 'badge-success' : 'badge-danger'}`}>
                            {t.tipoTransacao === TipoTransacaoEnum.Receita ? 'Receita' : 'Despesa'}
                          </span>
                        </td>
                        <td>{t.moradorId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {abaAtiva === 'totais' && (
          <div className="single-section">
            <h3>Valores por Morador</h3>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Total Receitas</th>
                  <th>Total Despesas</th>
                  <th>Saldo Líquido</th>
                </tr>
              </thead>
              <tbody>
                {totais.length === 0 ? (
                  <tr><td colSpan={5} className="text-center">Sem Dados</td></tr>
                ) : (
                  totais.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.nome}</strong></td>
                      <td>{p.idade} anos</td>
                      <td className="text-success">R$ {p.totalReceita.toFixed(2)}</td>
                      <td className="text-danger">R$ {p.totalDespesas.toFixed(2)}</td>
                      <td className={p.saldoLiquido >= 0 ? 'text-success bold' : 'text-danger bold'}>
                        R$ {p.saldoLiquido.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}