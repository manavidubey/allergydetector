// DOM elements
const imageInput = document.getElementById('imageInput');
const scanBtn = document.getElementById('scanBtn');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const allergenAlert = document.getElementById('allergenAlert');
const safeAlert = document.getElementById('safeAlert');
const allergenList = document.getElementById('allergenList');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const vegAlert = document.getElementById('vegAlert');
const nonVegAlert = document.getElementById('nonVegAlert');

let selectedFile = null;

// Event listeners
imageInput.addEventListener('change', handleFileSelect);
scanBtn.addEventListener('click', scanImage);

// Drag and drop functionality
const uploadArea = document.querySelector('.border-dashed');
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            handleFile(file);
        } else {
            showError('Please select an image file.');
        }
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    selectedFile = file;
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        previewSection.classList.remove('hidden');
        previewSection.classList.add('fade-in');
        
        // Enable scan button
        scanBtn.disabled = false;
        
        // Hide previous results
        hideAllSections();
    };
    reader.readAsDataURL(file);
}

function scanImage() {
    if (!selectedFile) {
        showError('Please select an image first.');
        return;
    }

    // Show loading
    showLoading();
    
    // Create form data
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    // Send to server
    fetch('/scan', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        
        if (data.success) {
            showResults(data);
        } else {
            showError(data.error || 'An error occurred while scanning.');
        }
    })
    .catch(error => {
        hideLoading();
        showError('Network error. Please try again.');
    });
}

function showLoading() {
    hideAllSections();
    loadingSection.classList.remove('hidden');
    loadingSection.classList.add('fade-in');
    scanBtn.disabled = true;
}

function hideLoading() {
    loadingSection.classList.add('hidden');
}

function showResults(data) {
    hideAllSections();
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fade-in');
    
    if (data.hasAllergens && data.allergens.length > 0) {
        showAllergenAlert(data.allergens);
    } else {
        showSafeAlert();
    }
    
    showVegStatus(data.vegStatus);
    scanBtn.disabled = false;
}

function showVegStatus(vegStatus) {
    if (vegStatus === 'vegetarian') {
        vegAlert.classList.remove('hidden');
        nonVegAlert.classList.add('hidden');
    } else {
        vegAlert.classList.add('hidden');
        nonVegAlert.classList.remove('hidden');
    }
}

function showAllergenAlert(allergens) {
    allergenAlert.classList.remove('hidden');
    allergenList.innerHTML = '';
    
    allergens.forEach(allergen => {
        const tag = document.createElement('span');
        tag.className = 'allergen-tag';
        tag.textContent = allergen;
        allergenList.appendChild(tag);
    });
}

function showSafeAlert() {
    safeAlert.classList.remove('hidden');
}

function showError(message) {
    hideAllSections();
    errorSection.classList.remove('hidden');
    errorSection.classList.add('fade-in');
    errorMessage.textContent = message;
    
    // Re-enable scan button
    scanBtn.disabled = false;
}

function hideAllSections() {
    previewSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    allergenAlert.classList.add('hidden');
    safeAlert.classList.add('hidden');
    vegAlert.classList.add('hidden');
    nonVegAlert.classList.add('hidden');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Disable scan button initially
    scanBtn.disabled = true;
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to scan
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!scanBtn.disabled) {
            scanImage();
        }
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        hideAllSections();
        imageInput.value = '';
        selectedFile = null;
        scanBtn.disabled = true;
    }
}); 