import axios from 'axios';
import puppeteer from 'puppeteer';
import QRCode from 'qrcode';
import path from 'path';
import fs from "fs"

export const qrCodes = new Map();

const deleteQrCodeFile = (filePath, qrCodeId, delay) => {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Erro ao excluir o arquivo ${filePath}:`, err);
      } else {
        console.log(`Arquivo ${filePath} excluído com sucesso.`);
        qrCodes.delete(qrCodeId);
      }
    });
  }, delay);
};

export async function getDataPayment(price, token) {
  try {
    const amountCents = Math.round(price * 100);

    const paymentResponse = await axios.post('https://api.livepix.gg/v2/payments', {
      amount: amountCents,
      currency: 'BRL',
      redirectUrl: "https://google.com"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const paymentUrl = paymentResponse.data.data.redirectUrl;
    // console.log(paymentResponse.data.data);
    // console.log(paymentResponse.data);


    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium'
    });

    const page = await browser.newPage();
    await page.goto(paymentUrl);

    await page.waitForSelector('button.MuiButton-contained');
    await page.click('button.MuiButton-contained');

    await page.waitForSelector('input.MuiInputBase-input.MuiOutlinedInput-input.css-1x5jdmq');
    const pixCode = await page.$eval('input.MuiInputBase-input.MuiOutlinedInput-input.css-1x5jdmq', el => el.value);

    await browser.close();

    const qrCodeBuffer = await QRCode.toBuffer(pixCode.trim(), {
      errorCorrectionLevel: 'H',
      width: 300
    });

    const qrCodeDir = path.resolve('tmp');
    if (!fs.existsSync(qrCodeDir)) {
      fs.mkdirSync(qrCodeDir);
    }

    const qrCodeId = `qr-${Date.now()}`;
    const fileName = `${qrCodeId}.png`;
    const filePath = path.join(qrCodeDir, fileName);

    fs.writeFileSync(filePath, qrCodeBuffer);

    qrCodes.set(qrCodeId, filePath);

    deleteQrCodeFile(filePath, qrCodeId, 20 * 60 * 1000);

    return {
      urlPayment: paymentUrl,
      qrCodePath: `/get-qrcode/${qrCodeId}`,
      pixCode: pixCode.trim()
    };

  } catch (error) {
    console.error('Erro ao gerar o pagamento:', error.response ? error.response.data : error.message);
    return null;
  }
}