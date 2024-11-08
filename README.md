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
