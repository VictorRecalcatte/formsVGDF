export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:3333/BaseDeDados', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type');
    let data;

    // Verifica se a resposta é JSON antes de tentar parseá-la
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();  // Recebe a resposta como texto se não for JSON
    }

    if (response.ok) {
      res.status(200).json({ message: 'Dados enviados com sucesso', data });
    } else {
      console.error('Erro na resposta do servidor:', response.status, data);
      res.status(response.status).json({ error: 'Erro ao processar dados', details: data });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Erro ao enviar os dados' });
  }
}
