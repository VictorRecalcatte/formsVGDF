import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    data_de_nascimento: '', // Valor será no formato YYYY-MM-DD
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome completo *:</label>
        <input
          type="text"
          name="nome_completo"
          value={formData.nome_completo}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Telefone *:</label>
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Data de nascimento *:</label>
        <input
          type="date"
          name="data_de_nascimento"
          value={formData.data_de_nascimento}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MyForm;
