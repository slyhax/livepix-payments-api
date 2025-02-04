import express from 'express';

export const routerVerifyPayment = express.Router();

routerVerifyPayment.post('/webhook', async (req, res) => {
  const { userId, clientId, event, resource } = req.body;

  if (!resource || !resource.id) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  console.log(
    userId,
    clientId,
    event,
    resource.id,
    resource.reference,
    resource.type
  );

  res.sendStatus(200);
});
