import axios from 'axios';

export async function getUrlPayment(price, token) {
  try {
    const amountCents = Math.round(price * 100);
    const paymentResponse = await axios.post('https://api.livepix.gg/v2/payments', {
      amount: amountCents,
      currency: 'BRL',
      redirectUrl: "https://google.com"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return paymentResponse.data.data.redirectUrl;

  } catch (error) {
    console.error('Erro ao gerar o link de pagamento:', error.response ? error.response.data : error.message);
  }
}

