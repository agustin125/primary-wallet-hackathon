# 🌐 WalletApp – Decentralized Wallet with SMS + Blockchain Transfers

WalletApp is a powerful open-source decentralized wallet designed for accessibility, scalability, and innovation. It supports blockchain-based token transfers across multiple networks and includes an SMS-based interface for users in low-connectivity environments.

## 🔋 Key Features

- ✅ **Multi-Network Support**: Transfer tokens via:
  - **Stellar** (XLM + custom assets)
  - **zkSync** (Ethereum Layer 2)
  - **Mantle** (0xMantle EVM-compatible chain)
- 📲 **SMS Transaction Layer**: Send and receive transactions via SMS using providers like Vonage (or Twilio).
- 🔐 **Secure Architecture**: Designed with modularity and clean separation of concerns.
- 🔮 **Future-Ready**: Built to integrate AI-based validations and transaction intelligence.
- 🧪 **Swagger Integration**: Easily test API endpoints locally via Swagger UI.

## 🚀 How It Works

- Users can interact with the wallet via HTTP endpoints or by sending SMS messages.
- All blockchain interactions are handled by network-specific providers.
- The `transactions/` module abstracts cross-chain token transfers.
- Incoming SMS messages are parsed and routed to appropriate services.


# Install project

`npm install`

# Configure Environment Variables

Create a .env file in the root directory of your project. You can use the provided .env.example file as a template.

`cp .env.example .env`

## Run project 

`npm run start`

## Run tests

`npm run test`
