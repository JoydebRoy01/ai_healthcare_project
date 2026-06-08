# AI Healthcare Platform

A sophisticated Django-based healthcare application powered by Google Gemini AI that analyzes medical reports using advanced OCR and machine learning technologies.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup, login, and logout system
- **Medical Report Analysis**: Upload and analyze PDF medical reports
- **OCR Text Extraction**: Automatic text extraction from medical documents using EasyOCR
- **AI-Powered Insights**: Google Gemini API integration for intelligent medical report analysis
- **Dashboard**: User-friendly interface to upload and view analyzed reports

### AI Analysis Capabilities
When a medical report is analyzed, the AI provides:
- Identification of abnormal values
- Possible health issues and concerns
- Simple language explanations
- Lifestyle advice and recommendations
- Guidance on when to consult a doctor

### Technologies Used
- **Backend Framework**: Django 6.0.3
- **Database**: SQLite (development)
- **Frontend**: HTML5, CSS3, Bootstrap 5.3
- **AI/ML Stack**:
  - Google Gemini API for text analysis
  - EasyOCR for optical character recognition
  - PDF2Image for PDF processing
  - PyTorch & TorchVision for ML operations
  - OpenCV for image processing
- **Additional Libraries**: NumPy, Pillow, Beautiful Soup

## 📦 Project Structure

```
ai_healthcare/
├── accounts/                    # User authentication module
│   ├── models.py
│   ├── views.py                 # Signup, login, logout views
│   ├── forms.py                 # User registration form
│   ├── urls.py                  # Auth routing
│   ├── admin.py
│   ├── apps.py
│   └── migrations/
│
├── dashboard/                   # Main application module
│   ├── models.py
│   ├── views.py                 # Dashboard home & report upload
│   ├── urls.py                  # Dashboard routing
│   ├── ai_service.py            # AI analysis service & Gemini API integration
│   ├── admin.py
│   ├── apps.py
│   └── migrations/
│
├── reports/                     # Reports module (scaffolding for future)
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   └── migrations/
│
├── medicines/                   # Medicines module (scaffolding for future)
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   └── migrations/
│
├── ai_engine/                   # AI Engine module (scaffolding for future)
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   └── migrations/
│
├── ai_healthcare/              # Django project settings
│   ├── settings.py              # Main configuration
│   ├── urls.py                  # URL routing
│   ├── asgi.py
│   ├── wsgi.py
│
├── templates/                  # HTML templates
│   ├── accounts/
│   │   ├── login.html           # Login page
│   │   └── signup.html          # Registration page
│   └── dashboard/
│       └── home.html            # Dashboard & report upload
│
├── db.sqlite3                   # Development database
├── manage.py                    # Django management script
└── rec.txt                      # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Poppler (for PDF processing)

### Installation

1. **Clone or download the project**
   ```bash
   cd ai_healthcare
   ```

2. **Install dependencies**
   ```bash
   pip install -r rec.txt
   ```
   
   Or install individually:
   ```bash
   pip install Django==6.0.6
   pip install easyocr
   pip install pdf2image
   pip install google-generativeai
   pip install torch torchvision
   pip install pillow
   pip install opencv-python-headless
   ```

3. **Install Poppler** (required for PDF processing)
   - **Windows**: Download from [Poppler Releases](https://github.com/oschwartz10612/poppler-windows/releases/) and update the path in `dashboard/views.py`
   - **Ubuntu/Debian**: `sudo apt-get install poppler-utils`
   - **macOS**: `brew install poppler`

4. **Set up environment variables**
   ```bash
   export GOOGLE_API_KEY='your-google-gemini-api-key'
   ```

5. **Apply migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser** (optional, for admin panel)
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open browser and navigate to `http://localhost:8000/`

## 📖 Usage Guide

### User Registration
1. Navigate to `/accounts/signup/`
2. Fill in username, email, and password
3. Click "Create Account"
4. You will be automatically logged in

### User Login
1. Navigate to `/accounts/login/`
2. Enter your credentials
3. Click "Login"

### Upload and Analyze Medical Reports
1. After logging in, you'll see the dashboard
2. Upload a PDF medical report using the file upload form
3. The system will:
   - Convert PDF to images
   - Extract text using OCR
   - Send to Gemini AI for analysis
4. View the AI-generated analysis with insights and recommendations

## 🔧 Configuration

### Poppler Path Configuration (views.py)
Update the `POPPLER_PATH` variable in `dashboard/views.py` based on your system:
```python
# Windows
POPPLER_PATH = r"C:\poppler\Library\bin\poppler-25.12.0\Library\bin"

# Linux/Mac - typically automatic if installed via package manager
POPPLER_PATH = None  # Use system default
```

### Gemini API Configuration
1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Set environment variable:
   ```bash
   export GOOGLE_API_KEY='your-key-here'
   ```
3. The application supports multiple Gemini models:
   - `gemini-flash-latest`
   - `gemini-3.5-flash`
   - `gemini-2.5-flash`

## 📊 Application Flow

```
User Access
    ↓
[Unauthenticated] → Signup/Login (accounts app)
    ↓
[Authenticated] → Dashboard (dashboard app)
    ↓
Upload PDF Report
    ↓
PDF → Images (pdf2image)
    ↓
Images → Text Extraction (EasyOCR + reader)
    ↓
Text → Gemini API Analysis (ai_service)
    ↓
Display AI Analysis & Recommendations
```

## 🔐 Security Features

- Django CSRF protection
- User authentication system
- Login required decorator for dashboard
- SQL injection prevention with ORM
- Password validation with multiple validators
- Secure session management

## 📝 Key Components

### `dashboard/ai_service.py`
Handles communication with Google Gemini API:
- `analyze_medical_report()`: Main analysis function
- `format_model_response()`: Formats API responses
- Fallback to demo mode when API key is not configured
- Automatic model switching if one fails

### `dashboard/views.py`
Dashboard view with PDF processing:
- `dashboard_home()`: Handles report uploads
- PDF to image conversion
- OCR text extraction
- Integration with AI service

### `accounts/views.py`
User authentication:
- `signup_view()`: User registration
- `login_view()`: User login
- `logout_view()`: User logout

## 🔮 Future Enhancements

The project includes scaffolding for:
- **Reports App**: Detailed report management and history
- **Medicines App**: Medicine database and interactions
- **AI Engine App**: Advanced ML models and processing

## ⚠️ Important Notes

1. **API Key Required**: Full AI analysis requires a valid Google Gemini API key
2. **Development Mode**: Currently running in Django DEBUG mode (not suitable for production)
3. **Poppler Dependency**: Required for PDF processing
4. **GPU Support**: Project includes CUDA libraries for GPU acceleration (optional)

## 🛠️ Admin Panel

Access Django admin at `http://localhost:8000/admin/`:
1. Create a superuser: `python manage.py createsuperuser`
2. Login with superuser credentials
3. Manage users and site content

## 📦 Dependencies Summary

### Core
- Django 6.0.6
- SQLParse 0.5.5

### AI/ML
- google-generativeai (Gemini API)
- EasyOCR 1.7.2
- PyTorch 2.12.0
- TorchVision 0.27.0
- OpenCV 4.13.0
- Pillow 12.2.0

### Processing
- pdf2image 1.17.0
- pdf2image 1.17.0
- NumPy 2.4.6
- SciPy 1.17.1
- Scikit-image 0.26.0

### Utilities
- Beautiful Soup 4.15.0
- PyYAML 6.0.3
- Shapely 2.1.2

## 🧪 Testing

Currently the project includes test files in each app:
- `accounts/tests.py`
- `dashboard/tests.py`
- `reports/tests.py`
- `medicines/tests.py`
- `ai_engine/tests.py`

Run tests with:
```bash
python manage.py test
```

## 📞 Troubleshooting

### PDF Processing Issues
- Ensure Poppler is installed and path is correct
- Check that the PDF file is valid and accessible

### Gemini API Errors
- Verify `GOOGLE_API_KEY` is set correctly
- Check API quota and key validity
- Application will fall back to demo mode if API is unavailable

### OCR Issues
- Ensure image quality is good
- Check that uploaded PDFs contain readable text
- EasyOCR may require downloading language models on first use

### Database Issues
- Delete `db.sqlite3` and run migrations again: `python manage.py migrate`
- Check file permissions in the project directory

## 📄 License

This project is part of the AI Healthcare Initiative.

## 👨‍💻 Development Notes

- **Framework Version**: Django 6.0.6 with Python 3.10+
- **Database**: SQLite for development (use PostgreSQL for production)
- **Server**: Django development server (use Gunicorn/WSGI in production)
- **Static Files**: Configure with whitenoise or web server for production

---

**Happy coding! 🚀**
