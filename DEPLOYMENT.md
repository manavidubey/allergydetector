# Deployment Guide

This guide will help you deploy your Allergy Food Scanner to various cloud platforms.

## Quick Deploy Options

### 1. Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** - Vercel will automatically detect your Node.js app

### 2. Railway (Free Tier Available)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Railway will automatically deploy** your application

### 3. Heroku (Free Tier Discontinued)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### 4. Render (Free Tier Available)

1. **Go to [Render.com](https://render.com)**
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node

### 5. Netlify (Free Tier Available)

1. **Go to [Netlify.com](https://netlify.com)**
2. **Connect your GitHub repository**
3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `public`

## Environment Variables

Set these in your deployment platform:

- `PORT` - Server port (usually set automatically by platform)
- `NODE_ENV` - Set to `production` for production deployments

## Build Commands

Before deploying, make sure to build the CSS:

```bash
npm run build
```

## Troubleshooting

### Common Issues

1. **Port Issues**
   - Most platforms set `PORT` automatically
   - Make sure your `server.js` uses `process.env.PORT || 3000`

2. **Dependencies**
   - Ensure all dependencies are in `package.json`
   - Run `npm install` locally to test

3. **File Size Limits**
   - Vercel: 50MB function size limit
   - Heroku: 500MB slug size limit
   - Consider using external OCR services for production

### Performance Optimization

1. **For Production:**
   - Consider using a CDN for static assets
   - Implement image compression
   - Use external OCR services (Google Vision API, AWS Textract)

2. **Scaling:**
   - Implement caching for OCR results
   - Use a database to store allergen information
   - Consider serverless functions for OCR processing

## Monitoring

After deployment, monitor your application:

1. **Check logs** in your platform's dashboard
2. **Test the health endpoint**: `https://your-app.vercel.app/health`
3. **Monitor performance** and error rates

## Security Considerations

1. **File Upload Limits**
   - Current limit: 10MB
   - Consider reducing for production

2. **Input Validation**
   - Only accept image files
   - Validate file types server-side

3. **Rate Limiting**
   - Consider implementing rate limiting for production use

## Support

If you encounter issues:

1. Check the platform's documentation
2. Review the application logs
3. Test locally first
4. Check the README.md for troubleshooting tips 