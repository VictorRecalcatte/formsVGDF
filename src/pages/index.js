import Head from "next/head";
import { useState, useEffect } from "react";




export default function Home() {
  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    carimbo_de_data_hora: '',
    nome_completo: '',
    data_de_nascimento: '',
    genero: '',
    ocupacao: '',
    telefone: '',
    instagram: '',
    email: '',
    regiao: '',
    orgao: '',
    comunidade_onde_mora: '',
    origem: ''
  });


  const generateTimestamp = () => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  // useEffect para definir o carimbo de data/hora quando o componente é montado
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      carimbo: generateTimestamp()
    }));
  }, []);


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
        console.log(result); // Manipule o resultado conforme necessário
        alert('Dados enviados com sucesso!');
      } else {
        console.error('Erro na resposta da API:', response.statusText);
        alert('Erro ao enviar os dados!');
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
        <meta name="description" content="Formulário para enviar dados para a API." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>FORMULÁRIO DE DADOS</h2>
        <form onSubmit={handleSubmit}>
          <label>Carimbo de data/hora:</label>
          <input type="text" name="Carimbo_de_data_hora" value={formData.carimbo} onChange={handleChange} placeholder='Digite o carimbo de data/hora'/> <br /><br />

          <label>Nome completo*:</label>
          <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} placeholder='Digite o nome completo'/> <br /><br />

          <label>Data de nascimento:</label>
          <input type="date" name="data_de_nascimento" value={formData.data_de_nascimento} onChange={handleChange} /> <br /><br />

          <label>Gênero:</label>
          <input type="text" name="genero" value={formData.genero} onChange={handleChange} placeholder='Digite o gênero'/> <br /><br />

          <label>Ocupação:</label>
          <input type="text" name="ocupacao" value={formData.ocupacao} onChange={handleChange} placeholder='Digite a ocupação'/> <br /><br />

          <label>Telefone*:</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder='Digite o telefone'/> <br /><br />

          <label>Instagram:</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} placeholder='Digite o Instagram'/> <br /><br />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Digite o email'/> <br /><br />

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
          <input type="text" name="orgao" value={formData.orgao} onChange={handleChange} placeholder='Digite o órgão'/> <br /><br />

          <label>Comunidade:</label>
          <input type="text" name="comunidade" value={formData.comunidade} onChange={handleChange} placeholder='Digite a comunidade'/> <br /><br />

          <label>Origem:</label>
          <input type="text" name="origem" value={formData.origem} onChange={handleChange} placeholder='Digite a origem'/> <br /><br />

          <button type="submit">Salvar</button>
        </form>
      </main>
    </>
  );
}