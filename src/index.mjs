import express from 'express';
import "dotenv/config";
import { routerPayment, routerQrCode, routerGetToken, routerUrlPayment, routerVerifyPayment } from '#routes';

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.use('/create-payment', routerPayment);
app.use('/verify-payment', routerVerifyPayment);
app.use('/payment-url', routerUrlPayment);
app.use('/get-qrcode', routerQrCode);
app.use('/get-token', routerGetToken);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada. Por favor, verifique o caminho.',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: ${PORT}`);
});