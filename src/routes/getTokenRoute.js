import express from 'express';
import { getToken } from '#controllers';

export const routerGetToken = express.Router();

routerGetToken.get('/:client/:secret', async (req, res) => {
  const { client, secret } = req.params;

  try {
    const token = await getToken(client, secret)
    res.json({
      message: 'Token gerado com sucesso!',
      token
    })
  } catch (error) {
    console.error('Erro ao gerar o token:', error);

    res.status(500).json({
      message: 'Erro ao gerar o token',
      error: error.message,
    });
  }
});

