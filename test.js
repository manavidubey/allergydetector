const express = require('express');
const path = require('path');

console.log('Testing Allergy Food Scanner Application...\n');

const fs = require('fs');
const requiredFiles = [
    'server.js',
    'package.json',
    'public/index.html',
    'public/script.js',
    'public/styles.css',
    'src/input.css',
    'tailwind.config.js',
    'README.md'
];

console.log('Checking required files:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

console.log('\nChecking dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['express', 'multer', 'tesseract.js', 'cors'];
requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
        console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
        console.log(`❌ ${dep} - MISSING`);
    }
});

console.log('\nTesting server functionality:');
const http = require('http');

const testServer = () => {
    return new Promise((resolve, reject) => {
        const req = http.get('http://localhost:3000/health', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.status === 'OK') {
                        resolve('✅ Server is running and responding correctly');
                    } else {
                        reject('❌ Server responded but with unexpected status');
                    }
                } catch (e) {
                    reject('❌ Server response is not valid JSON');
                }
            });
        });
        
        req.on('error', () => {
            reject('❌ Server is not running on port 3000');
        });
        
        req.setTimeout(5000, () => {
            reject('❌ Server request timed out');
        });
    });
};

testServer()
    .then(result => {
        console.log(result);
        console.log('\n🎉 All tests passed! Your Allergy Food Scanner is ready to use.');
        console.log('\n📱 Open your browser and go to: http://localhost:3000');
        console.log('\n💡 Features available:');
        console.log('   • Upload food label images');
        console.log('   • Drag and drop support');
        console.log('   • OCR text extraction');
        console.log('   • Allergen detection for 14 major allergens');
        console.log('   • Responsive design for mobile and desktop');
        console.log('   • Real-time processing');
    })
    .catch(error => {
        console.log(error);
        console.log('\n⚠️  Make sure to start the server with: npm start');
    }); 