// pages/api/submit.js
export default async function handler(req, res) {
    try {
      const response = await fetch('http://localhost:3333/BaseDeDados', {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Erro ao enviar os dados' });
    }
  }
  