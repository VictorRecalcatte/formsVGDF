import Head from 'next/head'; 
import { useState } from 'react';

export default function Home() { // Define o componente funcional Home como padrão para exportação.
  const [formData, setFormData] = useState({ // Inicializa o estado formData com um objeto contendo os campos do formulário.
    nome_completo: '',
    data_de_nascimento: '',
    genero: '',
    ocupacao: '',
    telefone: '',
    instagram: '',
    email: '',
    regiao_onde_mora: '',
    orgao: '',
    comunidade: '',
    origem: ''
  });

  const ocupacaoList = [ // Define uma lista de ocupações que podem ser escolhidas pelo usuário.
    { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
    { value: 'ADMINISTRADOR(A)', label: 'ADMINISTRADOR(A)' },
    { value: 'ADVOGADO(A)', label: 'ADVOGADO(A)' },
    { value: 'ASSISTENTE SOCIAL', label: 'ASSISTENTE SOCIAL' },
    { value: 'AUTONOMO', label: 'AUTONOMO' },
    { value: 'DONA DE CASA', label: 'DONA DE CASA' },
    { value: 'EMPRESÁRIO(A)', label: 'EMPRESÁRIO(A)' },
    { value: 'ENFERMEIRO(A)', label: 'ENFERMEIRO(A)' },
    { value: 'ENGENHEIRO(A)', label: 'ENGENHEIRO(A)' },
    { value: 'ESTUDANTE', label: 'ESTUDANTE' },
    { value: 'LÍDER COMUNITÁRIO(A)', label: 'LÍDER COMUNITÁRIO(A)' },
    { value: 'LÍDER ESPORTIVO', label: 'LÍDER ESPORTIVO' },
    { value: 'MÉDICO(A)', label: 'MÉDICO(A)' },
    { value: 'OUTRO', label: 'OUTRO' },
    { value: 'PADRE', label: 'PADRE' },
    { value: 'PASTOR(A)', label: 'PASTOR(A)' },
    { value: 'PROFESSOR(A)', label: 'PROFESSOR(A)' },
    { value: 'SERVIDOR(A) PÚBLICO(A)', label: 'SERVIDOR(A) PÚBLICO(A)' },
    { value: 'VENDEDOR(A)', label: 'VENDEDOR(A)' }
  ];

  const [filteredOcupacoes, setFilteredOcupacoes] = useState([]); // Estado para armazenar as ocupações filtradas com base na entrada do usuário.
  const [outraOcupacao, setOutraOcupacao] = useState(''); // Estado para armazenar o valor da ocupação caso o usuário escolha "OUTRO".

  const formatPhoneNumber = (value) => { // Função que formata o número de telefone inserido pelo usuário.
    const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3'); // Formata o número como (XX) XXXX-XXXX.
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); // Formata o número como (XX) XXXXX-XXXX se for mais longo.
  };

  const handleChange = (e) => { // Função que lida com as mudanças nos campos do formulário.
    const { name, value } = e.target;
    const formattedValue = name === 'telefone' ? formatPhoneNumber(value) : value; // Formata o telefone se o campo editado for o telefone.

    setFormData(prevData => ({
      ...prevData,
      [name]: formattedValue // Atualiza o estado formData com o valor do campo modificado.
    }));

    if (name === 'ocupacao') { // Se o campo editado for "ocupação", filtra a lista de ocupações com base na entrada.
      const filtered = ocupacaoList.filter(ocupacao =>
        ocupacao.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOcupacoes(filtered); // Atualiza o estado filteredOcupacoes com os resultados filtrados.
    }
  };

  const selectOcupacao = (value) => { // Função que define a ocupação selecionada a partir da lista de sugestões.
    setFormData(prevData => ({
      ...prevData,
      ocupacao: value,
    }));
    setFilteredOcupacoes([]); // Limpa a lista de ocupações filtradas após a seleção.
  };

  const resetForm = () => { // Função que reseta todos os campos do formulário.
    setFormData({
      nome_completo: '',
      data_de_nascimento: '',
      genero: '',
      ocupacao: '',
      telefone: '',
      instagram: '',
      email: '',
      regiao_onde_mora: '',
      orgao: '',
      comunidade: '',
      origem: ''
    });
  };

  const handleSubmit = async (e) => { // Função que lida com o envio do formulário.
    e.preventDefault(); // Previne o comportamento padrão do formulário, que é recarregar a página.

    try {
      const response = await fetch('/api/submit', { // Faz uma requisição POST para a rota '/api/submit' enviando os dados do formulário.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Converte os dados do formulário em JSON para serem enviados.
      });

      if (response.ok) { // Se a resposta for bem-sucedida, exibe uma mensagem de sucesso e reseta o formulário.
        alert('Dados enviados com sucesso!');
        resetForm(); // Limpa o formulário após o envio bem-sucedido.
      } else { // Se houver um erro, exibe uma mensagem de erro.
        const errorData = await response.json();
        console.error('Erro:', errorData);
        alert('Erro ao enviar os dados: ' + errorData.error);
      }
    } catch (error) { // Captura erros durante a requisição e exibe uma mensagem de erro.
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados!');
    }
  };

  return ( // Retorna o JSX que renderiza o formulário na interface do usuário.
    <>
      <Head> {/* Componente que permite a manipulação de elementos no <head> do HTML, como o título da página. */}
        <title>Formulário Base De Dados</title>
      </Head>
      <main>
        <h2>FORMULÁRIO DE DADOS</h2>
        <h3>Os campos marcados com um asterisco (*) são obrigatórios.</h3>
        <form onSubmit={handleSubmit}> {/* Formulário que chama handleSubmit ao ser enviado. */}

          <label>Nome completo*:</label>
          <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} /> <br /><br />

          <label>Data de nascimento*:</label>
          <input type="date" name="data_de_nascimento" value={formData.data_de_nascimento} onChange={handleChange} /> <br /><br />

          <label>Gênero*:</label>
          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Selecione o gênero</option>
            <option value="Homem">Homem</option>
            <option value="Mulher">Mulher</option>
          </select> <br /><br />

          <label>Ocupação*:</label>
          <input type="text" name="ocupacao" value={formData.ocupacao} onChange={handleChange} /> <br /><br />
          {filteredOcupacoes.length > 0 && ( // Renderiza a lista de ocupações filtradas se houver resultados.
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {filteredOcupacoes.map((ocupacao) => (
                <li
                  key={ocupacao.value}
                  onClick={() => selectOcupacao(ocupacao.label)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #ccc', marginBottom: '5px' }}
                >
                  {ocupacao.label}
                </li>
              ))}
            </ul>
          )}

          <label>Telefone*:</label>
          <input 
            type="text" 
            name="telefone" 
            value={formData.telefone} 
            onChange={handleChange} 
            placeholder="(61) 9XXXX-XXXX" 
            style={{ opacity: 0.7 }} 
          /><br /><br />

          <label>Instagram:</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} /> <br /><br />

          <label>Email*:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} /> <br /><br />

          <label>Região onde mora*:</label>
          <input type="text" name="regiao_onde_mora" value={formData.regiao_onde_mora} onChange={handleChange} /> <br /><br />

          <label>Órgão*:</label>
          <input type="text" name="orgao" value={formData.orgao} onChange={handleChange} /> <br /><br />

          <label>Comunidade:</label>
          <input type="text" name="comunidade" value={formData.comunidade} onChange={handleChange} /> <br /><br />

          <label>Origem:</label>
          <input type="text" name="origem" value={formData.origem} onChange={handleChange} /> <br /><br />

          <button type="submit">Enviar</button> {/* Botão que envia o formulário. */}
        </form>
      </main>
    </>
  );
}
