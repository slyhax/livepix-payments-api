# Livepix@Payments

Este guia detalha como usar e executar o projeto Livepix@Payments para integrar pagamentos via Pix. Ele cobre desde a configuração inicial até a utilização das principais funcionalidades.

## Pré-requisitos

Antes de começar, você precisará:

- Node.js instalado na versão 16 ou superior.
- Uma conta válida no Livepix com as credenciais de cliente (clientId e clientSecret).
- Um editor de código, como Visual Studio Code.

## Passo a Passo para Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/livepix-payments.git
```

### 2. Instalar as Dependências

Acesse o diretório do projeto e instale as dependências:

```bash
cd livepix-payments
npm install
```
# API de Pagamentos

Esta é uma API para gerenciar e processar pagamentos com funcionalidades de geração de URL de pagamento, QR code e obtenção de token.

## Endpoints

### 1. **POST /create-payment**

Este endpoint cria um pagamento.

- **Requisição**:  
  Método: `POST`  
  Body: JSON com os dados necessários para criar o pagamento.  
  Exemplo de corpo da requisição:
  ``` 
  https://localhost/createpayment/token/value
  ```

- **Resposta**:  
  Status: `200 OK`  
  Corpo: Detalhes do pagamento criado, como valor, qrcode, pix code etc.

### 2. **GET /paymenturl**

Este endpoint retorna a URL para realizar o pagamento.

- **Requisição**:  
  Método: `GET`  
  Query Parameters:  
  `paymentId` (ID do pagamento gerado no endpoint `/createpayment`)

- **Resposta**:  
  Status: `200 OK`  
  Corpo: URL do pagamento gerado.
  Exemplo de resposta:
  ```json
  {
    "url": "https://localhost/paymenturl"
  }
  ```

### 3. **GET /qrcode**

Este endpoint gera um QR code para o pagamento.

- **Requisição**:  
  Método: `GET`  
  Query Parameters:  
  `paymentId` (ID do qrcode gerado no endpoint `/createpayment`)

- **Resposta**:  
  Status: `200 OK`  
  Corpo: Imagem do QR code.

### 4. **GET /tokenget**

Este endpoint obtém um token de autenticação para a API.

- **Requisição**:  
  Método: `GET`
   ``` 
  https://localhost/tokenget/clientid/clientsecret
  ``

- **Resposta**:  
  Status: `200 OK`  
  Body: Token gerado para autenticação.
  Exemplo de resposta:
  ```json
  {
    "token": "..."
  }
  ```
