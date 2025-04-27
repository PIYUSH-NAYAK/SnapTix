# SnapTix - Blockchain-based Event Ticketing Platform

SnapTix is an innovative event discovery and ticketing platform that uses blockchain technology to securely issue and verify event tickets as NFTs. The platform helps users find events that match their interests and provides a seamless ticket purchasing experience with protection against counterfeiting.

## 📋 Features

- **AI-Powered Recommendations**: Discover events tailored to your preferences
- **Blockchain Security**: Tickets issued as NFTs with blockchain verification
- **Event Discovery**: Browse and search for events by category, location, and date
- **User Authentication**: Sign up and log in with email/password or Google account
- **Profile Management**: Manage your account and view your tickets
- **Responsive Design**: Seamless experience across desktop and mobile devices

## 🔧 Tech Stack

### Frontend
- Next.js 15 (React 19)
- Firebase Authentication
- Tailwind CSS
- Ethers.js for Web3 integration
- Wagmi for blockchain interactions

### Backend
- Express.js
- Fluvio streaming services
- GROQ for AI integration

### Smart Contracts
- Solidity
- Hardhat development environment
- Base (Ethereum L2) blockchain

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/snaptix.git
cd snaptix
```

2. **Set up environment variables**

Create a `.env` file in the frontend directory:

```bash
cd frontend
touch .env
```

Add the following variables to the file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

3. **Install frontend dependencies**

```bash
npm install
```

4. **Start the frontend development server**

```bash
npm run dev
```

5. **Set up the backend**

```bash
cd ../backend
touch .env
```

Add the following variables to the backend `.env` file:

```
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

6. **Install backend dependencies**

```bash
npm install
```

7. **Start the backend server**

```bash
npm start
```

8. **Deploy smart contracts (optional for local development)**

```bash
cd ../contracts
touch .env
```
Add the following variables to the file:

```
PRIVATE_KEY=your_wallet_private_key
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_MAINNET_RPC_URL=your_mainnet_rpc_provider_url_for_base
ETHERSCAN_API_KEY=your_etherscan_api_key
```

6. **Install contracts dependencies**

```bash
npm install
```

Edit the `.env` file with your private key and RPC URLs, then:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
```



## 🧪 Development Workflow

1. **Branch Naming Convention**
   - Features: `feature/feature-name`
   - Bugfixes: `fix/bug-description`
   - Improvements: `improve/improvement-description`

2. **Commit Message Format**
   - Use clear, descriptive commit messages
   - Begin with a verb in imperative mood (e.g., "Add", "Fix", "Update")

3. **Pull Request Process**
   - Create a PR against the `main` branch
   - Add relevant reviewers
   - Ensure all tests pass
   - Update documentation if needed

## 🔗 API Endpoints

### Backend API

- `GET /api/health` - Health check endpoint
- `POST /api/groq` - AI assistant endpoint
- Various event-related endpoints (see backend documentation)

## 🧠 Smart Contract Architecture

SnapTix uses two primary smart contracts:

1. **TicketNFT**: Manages the creation and minting of event tickets as NFTs
2. **TicketMarketplace**: Handles ticket sales, transfers, and verification



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

