#!/bin/bash

# Build the project
echo "Building projects..."
cd pokedex
npm run build
cd ..

# Create public directory for deployment
echo "Preparing files for deployment..."
rm -rf public
mkdir public
cp index.html ./public/
cp -r pokedex/build/* ./public/pokedex/

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d public

echo "Deployment complete! Your site should be live shortly."