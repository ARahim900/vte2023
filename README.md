# VTE Risk Assessment Dashboard 2023

A comprehensive dashboard for analyzing Venous Thromboembolism (VTE) risk assessments across Suhar Wilayat Health Centers.

## 🚀 Project Status

**✅ DEPLOYMENT READY!** All necessary files have been added and the project is ready for deployment.

## 📋 Features

- **Overview & Metrics**: Comprehensive statistics and performance indicators
- **Risk Factors Analysis**: Detailed breakdown of risk factors across health centers
- **Insights & Analysis**: AI-powered insights and recommendations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data Visualization**: Interactive charts using Recharts

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI Integration**: Google Gemini API

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ARahim900/vte2023.git
   cd vte2023/vte-risk-assessment-dashboard11
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Gemini API key.

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import this repository
5. Add environment variable: `GEMINI_API_KEY`
6. Click "Deploy"

### Option 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with your GitHub account
3. Click "New site from Git"
4. Choose this repository
5. Build command: `cd vte-risk-assessment-dashboard11 && npm install && npm run build`
6. Publish directory: `vte-risk-assessment-dashboard11/dist`
7. Add environment variable: `GEMINI_API_KEY`
8. Click "Deploy site"

### Option 3: Deploy to GitHub Pages

1. Run build command:
   ```bash
   cd vte-risk-assessment-dashboard11
   npm run build
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to package.json scripts:
   ```json
   "deploy-gh": "gh-pages -d dist"
   ```

4. Deploy:
   ```bash
   npm run deploy-gh
   ```

## 📊 Data Coverage

- **Total Pregnancies**: 3,281
- **VTE Assessments**: 3,086
- **Health Centers**: 7 locations
  - AL MULTAQA
  - AL UWAYNAT
  - TAREEF
  - FALAJ
  - WADI HIBI
  - SOHAR P.C.
  - WADI AHIN

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

## 📁 Project Structure

```
vte2023/
├── vte-risk-assessment-dashboard11/
│   ├── components/         # React components
│   ├── constants/          # Data and constants
│   ├── App.tsx            # Main application
│   ├── index.tsx          # Entry point
│   ├── index.html         # HTML template
│   ├── index.css          # Custom styles
│   ├── package.json       # Dependencies
│   ├── tsconfig.json      # TypeScript config
│   ├── vite.config.ts     # Vite configuration
│   └── .env.example       # Environment variables example
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of the Suhar Wilayat Health Network initiative.

## 👤 Author

**Abdularahim Al Balushi**
- GitHub: [@ARahim900](https://github.com/ARahim900)

---

**Note**: Remember to keep your API keys secure and never commit them to the repository!
