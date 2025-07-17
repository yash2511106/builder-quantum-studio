# Bias Detector for Job Descriptions

AI-powered bias detection for job descriptions. Create inclusive, diverse workplaces with intelligent analysis and recommendations.

## 🚀 Features

- **AI Bias Detection**: Detect gender, age, and racial bias in real-time
- **Diversity Scoring**: Get instant diversity scores (0-100) with detailed breakdowns
- **Inclusive Rewrites**: AI-powered inclusive rewrites with side-by-side comparisons
- **History Management**: Track and manage past analyses
- **File Upload**: Support for TXT, PDF, and DOCX files
- **Export Functionality**: Download results in various formats
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Development**: Vite

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bias-detector
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/bias-detector
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   PORT=8080
   ```

4. **Set up MongoDB**

   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎯 Usage

### 1. Create an Account

- Sign up with your email and password
- Add your organization name (optional)

### 2. Analyze Job Descriptions

- Paste job description text or upload a file
- Click "Analyze for Bias" to detect biased language
- View color-coded highlights and detailed breakdown

### 3. Generate Inclusive Versions

- Click "Generate Inclusive Version" to get AI-powered rewrites
- Compare original vs. rewritten versions side-by-side
- Download or copy the improved version

### 4. Track History

- View all past analyses in the History tab
- Download previous results
- Filter and search through your analyses

## 🔧 API Endpoints

### Authentication

- `POST /api/register` - Create new user account
- `POST /api/login` - Sign in user

### Analysis

- `POST /api/analyze` - Analyze job description for bias
- `POST /api/rewrite` - Generate inclusive rewrite
- `POST /api/score` - Calculate diversity score
- `POST /api/upload` - Upload and analyze file

### History

- `GET /api/history` - Get user's analysis history
- `DELETE /api/job/:id` - Delete specific analysis

## 🎨 Bias Detection Categories

The system detects three main types of bias:

### Gender Bias (Blue highlights)

- Terms like "aggressive", "dominant", "rock star"
- Gendered pronouns and titles
- Language that may deter certain genders

### Age Bias (Orange highlights)

- Terms like "young", "energetic", "digital native"
- Age-related requirements or preferences
- Language that favors specific age groups

### Racial Bias (Red highlights)

- Terms like "articulate", "cultural fit", "urban"
- Coded language that may exclude certain groups
- Requirements that disproportionately affect minorities

## 🏗 Project Structure

```
├── client/                 # React frontend
│   ├── components/         # React components
│   ├── contexts/          # React contexts (Auth)
│   ├── lib/               # Utility functions
│   └── pages/             # Page components
├── server/                # Express backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── services/          # Business logic
└── public/                # Static assets
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the client: `npm run build:client`
2. Deploy the `dist/spa` folder

### Backend (Render/Railway)

1. Set environment variables
2. Deploy with: `npm start`

### Database

- Use MongoDB Atlas for production
- Update `MONGODB_URI` with your cluster connection string

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@biasdetector.ai or create an issue in the repository.

## 🎉 Demo

Try the live demo at: [https://biasdetector.ai](https://biasdetector.ai)

Demo credentials:

- Email: demo@biasdetector.ai
- Password: demo123
