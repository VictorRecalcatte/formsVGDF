import Head from 'next/head';
import { useState, useEffect } from 'react';

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
    origem: ''
  });

  // Função para lidar com a mudança dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Dados enviados com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro:', errorData);
        alert('Erro ao enviar os dados: ' + errorData.error);
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados!');
    }
  };

  return (
    <>
      <Head>
        <title>Formulário Base De Dados</title>
      </Head>
      <main>
        <h2>FORMULÁRIO DE DADOS</h2>
        <form onSubmit={handleSubmit}>

          <label>Nome completo*:</label>
          <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} /> <br /><br />

          <label>Data de nascimento*:</label>
          <input type="date" name="data_de_nascimento" value={formData.data_de_nascimento} onChange={handleChange} /> <br /><br />

          
          <label>Gênero*:</label>
          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select> <br /><br />


          <label>Ocupação:</label>
          <input type="text" name="ocupacao" value={formData.ocupacao} onChange={handleChange} /> <br /><br />

          <label>Telefone*:</label><input 
           type="text" 
           name="telefone" 
          value={formData.telefone} 
          onChange={handleChange} 
          placeholder="XX XXXXXXXX" 
        style={{ opacity: 0.7 }} />

<br /><br />

          <label>Instagram:</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} /> <br /><br />

          <label>Email*:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} /> <br /><br />

         
          <label>Região onde mora*:</label>
          <select name="regiao_onde_mora" value={formData.regiao_onde_mora} onChange={handleChange}>
            <option value="">Selecione uma região</option>
            <option value="Água Quente (RA XXXV)">Água Quente (RA XXXV)</option>
            <option value="Arapoanga (RA XXXIV)">Arapoanga (RA XXXIV)</option>
            <option value="Águas Claras (RA XX)">Águas Claras (RA XX)</option>
            <option value="Arniqueira (RA XXXIII)">Arniqueira (RA XXXIII)</option>
            <option value="Brazlândia (RA IV)">Brazlândia (RA IV)</option>
            <option value="Candangolândia (RA XIX)">Candangolândia (RA XIX)</option>
            <option value="Ceilândia (RA IX)">Ceilândia (RA IX)</option>
            <option value="Cruzeiro (RA XI)">Cruzeiro (RA XI)</option>
            <option value="Fercal (RA XXXI)">Fercal (RA XXXI)</option>
            <option value="Gama (RA II)">Gama (RA II)</option>
            <option value="Guará (RA X)">Guará (RA X)</option>
            <option value="Itapoã (RA XXVIII)">Itapoã (RA XXVIII)</option>
            <option value="Jardim Botânico (RA XXVII)">Jardim Botânico (RA XXVII)</option>
            <option value="Lago Norte (RA XVIII)">Lago Norte (RA XVIII)</option>
            <option value="Lago Sul (RA XVI)">Lago Sul (RA XVI)</option>
            <option value="Núcleo Bandeirante (RA VIII)">Núcleo Bandeirante (RA VIII)</option>
            <option value="Paranoá (RA VII)">Paranoá (RA VII)</option>
            <option value="Park Way (RA XXIV)">Park Way (RA XXIV)</option>
            <option value="Planaltina (RA VI)">Planaltina (RA VI)</option>
            <option value="Plano Piloto (RA I)">Plano Piloto (RA I)</option>
            <option value="Recanto das Emas (XV)">Recanto das Emas (XV)</option>
            <option value="Riacho Fundo (RA XVII)">Riacho Fundo (RA XVII)</option>
            <option value="Riacho Fundo II (RA XXI)">Riacho Fundo II (RA XXI)</option>
            <option value="Samambaia (RA XII)">Samambaia (RA XII)</option>
            <option value="Santa Maria (RA XIII)">Santa Maria (RA XIII)</option>
            <option value="São Sebastião (RA XIV)">São Sebastião (RA XIV)</option>
            <option value="SCIA/Estrutural (RA XXV)">SCIA/Estrutural (RA XXV)</option>
            <option value="SIA (RA XXIX)">SIA (RA XXIX)</option>
            <option value="Sobradinho (RA V)">Sobradinho (RA V)</option>
            <option value="Sobradinho II (RA XXVI)">Sobradinho II (RA XXVI)</option>
            <option value="Sol Nascente e Pôr do Sol ( RA XXXII)">Sol Nascente e Pôr do Sol ( RA XXXII)</option>
            <option value="Sudoeste/Octogonal (RA XXII)">Sudoeste/Octogonal (RA XXII)</option>
            <option value="Taguatinga (RA III)">Taguatinga (RA III)</option>
            <option value="Varjão (RA XXIII)">Varjão (RA XXIII)</option>
            <option value="Vicente Pires (RA XXX)">Vicente Pires (RA XXX)</option>
          </select> <br /><br />

          <label>Órgão:</label>
          <input type="text" name="orgao" value={formData.orgao} onChange={handleChange} /> <br /><br />

          <label>Comunidade:</label>
          <input type="text" name="comunidade" value={formData.comunidade} onChange={handleChange} /> <br /><br />

          <label>Origem:</label>
          <input type="text" name="origem" value={formData.origem} onChange={handleChange} /> <br /><br />

          <button type="submit">Enviar formulário</button>
        </form>
      </main>
    </>
  );
}
