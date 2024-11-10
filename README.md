# DhanBuddy - AI-Powered Personal Finance App 🚀

![DhanBuddy Logo](/public/images/DhanBuddy.png)

DhanBuddy is a modern, AI-powered personal finance application designed specifically for Indian users. It helps users track expenses, manage investments, and achieve financial freedom with intelligent insights.

## 🌟 Features

### Landing Page
- ✨ Modern, animated hero section with Framer Motion
- 📱 Fully responsive design with Tailwind CSS
- 🎯 Clear value proposition
- 🇮🇳 India-focused content and currency formatting

### Authentication
- 🔐 JWT-based secure authentication
- 📝 User registration with validation
- 🔑 Password reset functionality
- 🛡️ Protected routes

### Dashboard
- 📊 Interactive expense charts with Recharts
- 💰 Real-time transaction tracking
- 📈 Financial statistics and insights
- 🔍 Advanced search and filtering
- 📱 Responsive layout for all devices

### Backend API
- 🔄 RESTful API with Django REST Framework
- 🎯 Custom user model with extended fields
- 📁 Transaction and category management
- 🎯 Goals tracking system
- 📚 API documentation with Swagger/OpenAPI

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- Axios for API calls

### Backend
- Django 5.1 with Python 3.10
- Django REST Framework
- JWT Authentication
- SQLite (Development) / PostgreSQL (Production)
- Django Filters

### AI Features
- OpenAI GPT for financial insights
- Machine Learning models for expense categorization
- Predictive analytics for spending patterns
- Custom NLP for Indian context understanding

### Security
- HTTPS encryption
- Data encryption at rest
- Regular security audits
- GDPR and PDPA compliance
- Multi-factor authentication

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- Python >= 3.10
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dhanbuddy.git
cd dhanbuddy
```

2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

3. Backend Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## 🔐 Environment Setup

```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8000
VITE_AI_API_KEY=your_openai_key

# Backend (.env)
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=your_database_url
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📝 API Documentation

Access the API documentation at:
- Swagger UI: http://localhost:8000/
- API Endpoints: http://localhost:8000/schema/

## 🔜 Upcoming Features

- [ ] Email verification for new users
- [ ] Social authentication (Google, Facebook)
- [ ] Transaction analytics and insights
- [ ] PDF report generation
- [ ] Notification system
- [ ] Budget planning tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to all contributors
- Inspired by India's digital finance revolution
- Built with ❤️ for Indian users

---

<p align="center">Made with ❤️ in India 🇮🇳</p>

## 📈 Development Progress (November 8, 2024)

### Recently Completed Features ✅
- EMI Management System
  - EMI Calculator with real-time calculations
  - Active and completed EMIs tracking
  - Payment reminders and notifications
  - Progress visualization
  - Loan type categorization

- Transaction System
  - Income and expense tracking
  - Category-based organization
  - Real-time updates
  - Monthly statistics
  - Expense breakdown visualization

- Email Notifications
  - EMI payment reminders
  - Transaction alerts
  - Monthly financial reports
  - Custom email templates

### Current Sprint 🔄
- AI-powered insights
- Budget planning tools
- Investment tracking
- PDF report generation
- Dark mode implementation

### Technical Achievements 🏆
- Implemented real-time data updates
- Added comprehensive error handling
- Created responsive UI components
- Set up email notification system
- Improved API documentation

### Next Sprint Goals 🎯
1. AI Features
   - Expense categorization
   - Spending pattern analysis
   - Investment recommendations
   - Financial health predictions

2. Advanced Features
   - Recurring transactions
   - Bill payment reminders
   - Investment portfolio tracking
   - Goal progress tracking

3. User Experience
   - Dark mode
   - Mobile responsiveness
   - Performance optimizations
   - Offline capabilities

### System Status 📊
- Frontend: 80% Complete
- Backend: 85% Complete
- Testing: 70% Complete
- Documentation: 75% Complete

---

<p align="center">Last Updated: November 8, 2024</p>
