# Allergy Food Scanner

A modern web application that uses OCR (Optical Character Recognition) to scan food labels and detect common allergens. Built with Node.js, Express, Tesseract.js, and a responsive frontend.

## Features

- 📸 **Image Upload**: Drag and drop or click to upload food label images
- 🔍 **OCR Processing**: Extract text from food labels using Tesseract.js
- ⚠️ **Allergen Detection**: Automatically detect 14 major allergens
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS
- ⚡ **Real-time Processing**: Fast and efficient scanning

## Supported Allergens

The scanner detects the following major allergens:
- Milk (dairy, lactose, casein, whey, etc.)
- Eggs (albumin, ovalbumin, lysozyme)
- Fish (salmon, tuna, cod, etc.)
- Shellfish (shrimp, crab, lobster, etc.)
- Tree Nuts (almonds, walnuts, cashews, etc.)
- Peanuts
- Wheat (gluten, flour, bread, etc.)
- Soybeans (soy, tofu, miso, etc.)
- Sesame
- Sulfites
- Mustard
- Celery
- Lupin
- Molluscs

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd allergy-food-scanner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS (optional - for development)**
   ```bash
   npm run build-css
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

1. **Upload an Image**: Click the upload area or drag and drop a food label image
2. **Preview**: The image will be displayed for confirmation
3. **Scan**: Click "Scan for Allergens" to process the image
4. **View Results**: See detected allergens and extracted text

## API Endpoints

- `GET /` - Main application page
- `POST /scan` - Upload and scan image for allergens
- `GET /health` - Health check endpoint

## Technical Stack

- **Backend**: Node.js, Express.js
- **OCR**: Tesseract.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **File Upload**: Multer
- **Icons**: Font Awesome

## Project Structure

```
allergy-food-scanner/
├── public/
│   ├── index.html      # Main application page
│   ├── script.js       # Frontend JavaScript
│   └── styles.css      # Compiled CSS
├── src/
│   └── input.css       # Tailwind CSS source
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
└── README.md          # This file
```

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Development Commands
```bash
# Install dependencies
npm install

# Start development server with auto-restart
npm run dev

# Build CSS for production
npm run build

# Start production server
npm start
```

## Deployment

### Local Deployment
1. Install dependencies: `npm install`
2. Build CSS: `npm run build`
3. Start server: `npm start`

### Cloud Deployment
The application can be deployed to various cloud platforms:

**Heroku:**
1. Create a `Procfile` with: `web: node server.js`
2. Deploy using Heroku CLI or GitHub integration

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

**Railway:**
1. Connect your GitHub repository
2. Railway will automatically detect and deploy

## Environment Variables

- `PORT` - Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

This application is for educational and informational purposes only. It should not replace professional medical advice. Always consult with healthcare professionals regarding food allergies and dietary restrictions.

## Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include screenshots if applicable

---

**Note**: The first time you run the application, Tesseract.js will download language models, which may take a few minutes depending on your internet connection. 