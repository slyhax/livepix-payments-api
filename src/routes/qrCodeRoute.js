import express from 'express';
import { qrCodes } from '#controllers';
import path from 'path';

export const routerQrCode = express.Router();

routerQrCode.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!qrCodes.has(id)) {
    return res.status(404).json({ error: 'QR Code não encontrado ou expirado.' });
  }

  const filePath = qrCodes.get(id);
  res.sendFile(filePath);
});

