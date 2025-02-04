import express from 'express';
import { getDataPayment } from '#controllers';

export const routerPayment = express.Router();

routerPayment.get('/:token/:value', async (req, res) => {
  const { token, value } = req.params;

  try {
    const data = await getDataPayment(value, token);

    const { pixCode, qrCodePath, urlPayment } = data

    res.json({
      message: 'Pagamento criado com sucesso!',
      token,
      value,
      paymentDetails: {
        urlPayment,
        qrCodePath,
        pixCode,
      },
    });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);

    res.status(500).json({
      message: 'Erro ao criar pagamento',
      error: error.message,
    });
  }
});