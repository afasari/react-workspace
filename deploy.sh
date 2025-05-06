#!/bin/bash

# Build the project
echo "Building projects..."
# cd pokedex
# npm run build
# cd ..

cd calculator
npm run build
cd ..

# Create public directory and subdirectories for deployment
echo "Preparing files for deployment..."
rm -rf public
mkdir public
mkdir -p public/pokedex
mkdir -p public/calculator
cp index.html ./public/
cp -r ./pokedex/build/* ./public/pokedex/
cp -r ./calculator/dist/* ./public/calculator/

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx gh-pages -d public

echo "Deployment complete! Your site should be live shortly."