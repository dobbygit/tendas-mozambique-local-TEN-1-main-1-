#!/bin/bash

# Create export directory
EXPORT_DIR="tendas-mozambique-local"
mkdir -p $EXPORT_DIR

# Copy source files
cp -r src $EXPORT_DIR/
cp -r public $EXPORT_DIR/

# Copy config files
cp package.json $EXPORT_DIR/
cp package-lock.json $EXPORT_DIR/
cp vite.config.ts $EXPORT_DIR/
cp tsconfig.json $EXPORT_DIR/
cp tsconfig.node.json $EXPORT_DIR/
cp tailwind.config.js $EXPORT_DIR/
cp postcss.config.js $EXPORT_DIR/
cp index.html $EXPORT_DIR/
cp components.json $EXPORT_DIR/

# Create a .gitignore file
echo "node_modules\ndist\n.DS_Store\n.env\n.env.local\n**/tempobook/dynamic/\n**/tempobook/storyboards/" > $EXPORT_DIR/.gitignore

# Create a README with instructions
cat > $EXPORT_DIR/README.md << "EOL"
# Tendas Mozambique Website

## Local Development Setup

1. Clone or download this repository to your local machine
2. Open the project folder in your preferred text editor (VS Code, Sublime, etc.)
3. Install dependencies by running: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser at the URL shown in the terminal (usually http://localhost:5173)

## Project Structure

- `/src/components` - React components
- `/src/lib` - Utility functions and API
- `/public` - Static assets

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- ShadCN UI

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.
EOL

# Create a zip file
zip -r tendas-mozambique-local.zip $EXPORT_DIR

echo "\nExport complete! Files are in $EXPORT_DIR/ and tendas-mozambique-local.zip"
echo "\nTo work on this project locally:"
echo "1. Download tendas-mozambique-local.zip"
echo "2. Extract the zip file to your computer"
echo "3. Open the folder in your text editor"
echo "4. Run npm install"
echo "5. Run npm run dev"
echo "6. Open http://localhost:5173 in your browser"
