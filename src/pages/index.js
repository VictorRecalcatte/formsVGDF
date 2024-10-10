import Head from 'next/head';
import { useState } from 'react';
import InputMask from 'react-input-mask';


export default function Home() {
  const [formData, setFormData] = useState({
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
    origem: '',
    senha: ''
  });

  const ocupacaoList = [
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
    { value: 'VENDEDOR(A)', label: 'VENDEDOR(A)' },
    { value: 'DESEMPREGADO(A)', label: 'DESEMPREGADO(A)' }
  ];

  const regiaoList = [
    "Água Quente (RA XXXV)", "Arapoanga (RA XXXIV)", "Águas Claras (RA XX)",
    "Arniqueira (RA XXXIII)", "Brazlândia (RA IV)", "Candangolândia (RA XIX)",
    "Ceilândia (RA IX)", "Cruzeiro (RA XI)", "Fercal (RA XXXI)", "Gama (RA II)",
    "Guará (RA X)", "Itapoã (RA XXVIII)", "Jardim Botânico (RA XXVII)",
    "Lago Norte (RA XVIII)", "Lago Sul (RA XVI)", "Núcleo Bandeirante (RA VIII)",
    "Paranoá (RA VII)", "Park Way (RA XXIV)", "Planaltina (RA VI)", "Plano Piloto (RA I)",
    "Recanto das Emas (RA XV)", "Riacho Fundo (RA XVII)", "Riacho Fundo II (RA XXI)",
    "Samambaia (RA XII)", "Santa Maria (RA XIII)", "São Sebastião (RA XIV)",
    "SCIA/Estrutural (RA XXV)", "SIA (RA XXIX)", "Sobradinho (RA V)",
    "Sobradinho II (RA XXVI)", "Sol Nascente e Pôr do Sol (RA XXXII)",
    "Sudoeste/Octogonal (RA XXII)", "Taguatinga (RA III)", "Varjão (RA XXIII)",
    "Vicente Pires (RA XXX)"
  ];

  const [filteredOcupacoes, setFilteredOcupacoes] = useState([]);
  const [filteredRegioes, setFilteredRegioes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'ocupacao') {
      const filtered = ocupacaoList.filter(ocupacao =>
        ocupacao.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOcupacoes(filtered);
    }

    if (name === 'regiao_onde_mora') {
      const filtered = regiaoList.filter(regiao =>
        regiao.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRegioes(filtered);
    }
  };

  const selectOcupacao = (value) => {
    setFormData(prevData => ({
      ...prevData,
      ocupacao: value,
    }));
    setFilteredOcupacoes([]);
  };

  const selectRegiao = (value) => {
    setFormData(prevData => ({
      ...prevData,
      regiao_onde_mora: value,
    }));
    setFilteredRegioes([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== 'vgdfcadastro') {
      alert('Senha incorreta! Por favor, digite a senha correta.');
      return;
    }

     // Remover o campo "senha" antes de enviar os dados para o backend
  const { senha, ...formDataToSend } = formData;

  const botaoEnviar = e.target.querySelector('button[type="submit"]');
  botaoEnviar.disabled = true;
  botaoEnviar.innerText = 'Enviando...';

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend), // Enviar formData sem o campo "senha"
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Sucesso:', result);
    alert('Formulário enviado com sucesso!');

    // Resetar o formulário
    setFormData({
      nome_completo: '', data_de_nascimento: '', genero: '', ocupacao: '',
      telefone: '', instagram: '', email: '', regiao_onde_mora: '',
      orgao: '', comunidade: '', origem: '', senha: ''
    });
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Erro ao enviar o formulário. Tente novamente.');
  } finally {
    botaoEnviar.disabled = false;
    botaoEnviar.innerText = 'Enviar';
  }
};

  return (
    <>
      <Head>
        <title>Formulário Base De Dados</title>
      </Head>
      <main>
        <h2>FORMULÁRIO DE DADOS</h2>
        <h3>Os campos marcados com um asterisco (*) são obrigatórios.</h3>
        <form onSubmit={handleSubmit}>

          <div class="form-group">
              <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} /> 
              <label>Nome completo*:</label>
          </div>

          <div class="form-group">
            <InputMask
              mask="99/99/9999"
              value={formData.data_de_nascimento}
              onChange={handleChange}
              name="data_de_nascimento"
              placeholder="XX/XX/XXXX"
            />
              <label>Data de nascimento *:</label>
          </div>

          <div class = "form-group">
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Selecione o gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            <label>Gênero*:</label>
          </div>


          <div class='form-group'>
            <input type="text" name="ocupacao" value={formData.ocupacao} onChange={handleChange} /> <br />
            {filteredOcupacoes.length > 0 && (
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
            <label>Ocupação*:</label>
          </div>

          <div class = 'form-group'>
                <input type="text" name="regiao_onde_mora" value={formData.regiao_onde_mora} onChange={handleChange} /> <br />
              {filteredRegioes.length > 0 && (
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  {filteredRegioes.map((regiao) => (
                    <li
                      key={regiao}
                      onClick={() => selectRegiao(regiao)}
                      style={{ cursor: 'pointer', borderBottom: '1px solid #ccc', marginBottom: '5px' }}
                    >
                      {regiao}
                    </li>
                  ))}
                </ul>
              )}
              <label>Região onde mora*:</label>
            </div>

            <div class = 'form-group'>
              <InputMask
              mask="(99) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
              name="telefone"
              placeholder="(XX) XXXXX-XXXX"
              />
              <label>Celular*:</label>
            </div>

            <div class="form-group">
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} /> 
            <label>Instagram:</label>
          </div>

          <div class='form-group'>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label>Email*:</label>
          </div>

          <div class="form-group">
            
            <input type="text" name="orgao" value={formData.orgao} onChange={handleChange} />
            <label>Órgão:</label>
          </div>

          <div class = "form-group">
            <input type="text" name="comunidade" value={formData.comunidade} onChange={handleChange} />
            <label>Comunidade:</label>
          </div>

          <div class = "form-group">
            <input type="text" name="origem" value={formData.origem} onChange={handleChange} />
            <label>Origem:</label>
          </div>

          <div class = "form-group">
            <input 
              type="password" 
              name="senha" 
              value={formData.senha} 
              onChange={handleChange} 
              placeholder="Digite a senha para enviar o formulário" 
            /> 
            <label>Senha:</label>
          </div>
          
          <button type="submit" style={{ cursor: 'pointer' }}>Enviar</button>
        </form>
      </main>
    </>
  );
}
