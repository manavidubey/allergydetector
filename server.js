const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/styles.css', express.static(path.join(__dirname, 'public', 'styles.css'), {
    setHeaders: (res, path) => {
        res.setHeader('Content-Type', 'text/css');
    }
}));

app.use('/script.js', express.static(path.join(__dirname, 'public', 'script.js'), {
    setHeaders: (res, path) => {
        res.setHeader('Content-Type', 'application/javascript');
    }
}));

app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Allergy database - common allergens and their variations
const allergenDatabase = {
    'milk': ['milk', 'dairy', 'lactose', 'casein', 'whey', 'butter', 'cheese', 'cream', 'yogurt'],
    'eggs': ['egg', 'eggs', 'albumin', 'ovalbumin', 'lysozyme'],
    'fish': ['fish', 'salmon', 'tuna', 'cod', 'halibut', 'anchovy'],
    'shellfish': ['shellfish', 'shrimp', 'crab', 'lobster', 'oyster', 'clam', 'mussel'],
    'tree nuts': ['almond', 'walnut', 'cashew', 'pistachio', 'pecan', 'hazelnut', 'macadamia', 'brazil nut'],
    'peanuts': ['peanut', 'peanuts', 'arachis'],
    'wheat': ['wheat', 'gluten', 'flour', 'bread', 'pasta', 'cereal'],
    'soybeans': ['soy', 'soybean', 'soya', 'tofu', 'miso', 'tempeh'],
    'sesame': ['sesame', 'sesamum', 'tahini'],
    'sulfites': ['sulfite', 'sulphite', 'sulfur dioxide', 'sodium sulfite'],
    'mustard': ['mustard', 'sinapis'],
    'celery': ['celery', 'celeriac'],
    'lupin': ['lupin', 'lupine'],
    'molluscs': ['mollusc', 'mollusk', 'snail', 'abalone', 'conch']
};

const nonVegIngredients = [
    'meat', 'beef', 'pork', 'chicken', 'lamb', 'mutton', 'turkey', 'duck', 'goose',
    'fish', 'salmon', 'tuna', 'cod', 'halibut', 'anchovy', 'sardine', 'mackerel',
    'shellfish', 'shrimp', 'prawn', 'crab', 'lobster', 'oyster', 'clam', 'mussel',
    'egg', 'eggs', 'albumin', 'ovalbumin', 'lysozyme',
    'gelatin', 'rennet', 'carmine', 'cochineal', 'shellac', 'l-cysteine',
    'bacon', 'ham', 'sausage', 'pepperoni', 'salami', 'prosciutto'
];

// Function to detect allergens in text
function detectAllergens(text) {
    const detectedAllergens = [];
    const lowerText = text.toLowerCase();
    
    for (const [allergen, variations] of Object.entries(allergenDatabase)) {
        for (const variation of variations) {
            if (lowerText.includes(variation)) {
                if (!detectedAllergens.includes(allergen)) {
                    detectedAllergens.push(allergen);
                }
                break;
            }
        }
    }
    
    return detectedAllergens;
}

function detectVegStatus(text) {
    const lowerText = text.toLowerCase();
    
    for (const ingredient of nonVegIngredients) {
        if (lowerText.includes(ingredient)) {
            return 'non-vegetarian';
        }
    }
    
    return 'vegetarian';
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/scan', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Convert buffer to base64 for Tesseract
        const base64Image = req.file.buffer.toString('base64');
        const imageData = `data:${req.file.mimetype};base64,${base64Image}`;

        // Perform OCR
        const result = await Tesseract.recognize(imageData, 'eng');

        const extractedText = result.data.text;
        const detectedAllergens = detectAllergens(extractedText);
        const vegStatus = detectVegStatus(extractedText);

        res.json({
            success: true,
            allergens: detectedAllergens,
            hasAllergens: detectedAllergens.length > 0,
            vegStatus: vegStatus
        });

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ 
            error: 'Error processing image',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Allergy Food Scanner is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Allergy Food Scanner is ready to use!');
}); 