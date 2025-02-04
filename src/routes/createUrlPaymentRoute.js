import express from 'express';
import { getUrlPayment } from '#controllers';

export const routerUrlPayment = express.Router();

routerUrlPayment.get('/:token/:value', async (req, res) => {
  const { token, value } = req.params;

  try {
    const url = await getUrlPayment(value, token)
    res.json({
      message: 'Pagamento criado com sucesso!',
      token,
      value,
      paymentDetails: {
        url,
      },
    })
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);

    res.status(500).json({
      message: 'Erro ao criar pagamento',
      error: error.message,
    });
  }
});

