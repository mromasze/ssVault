const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const vendorsDir = path.join(rootDir, 'src', 'renderer', 'vendors');

// Ensure vendors directory structure
const dirsToCreate = [
    path.join(vendorsDir, 'bootstrap', 'css'),
    path.join(vendorsDir, 'bootstrap', 'js'),
    path.join(vendorsDir, 'bootstrap-icons', 'fonts'),
    path.join(vendorsDir, 'tailwind') // ensuring tailwind exists too
];

dirsToCreate.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Copy function
function copyFile(src, dest) {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${path.basename(src)} -> ${path.relative(rootDir, dest)}`);
    } else {
        console.warn(`Warning: Source file not found: ${src}`);
    }
}

// Bootstrap
copyFile(
    path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
    path.join(vendorsDir, 'bootstrap', 'css', 'bootstrap.min.css')
);
copyFile(
    path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.bundle.min.js'),
    path.join(vendorsDir, 'bootstrap', 'js', 'bootstrap.bundle.min.js')
);

// Bootstrap Icons
copyFile(
    path.join(rootDir, 'node_modules', 'bootstrap-icons', 'font', 'bootstrap-icons.css'),
    path.join(vendorsDir, 'bootstrap-icons', 'bootstrap-icons.css')
);

const fontsSrc = path.join(rootDir, 'node_modules', 'bootstrap-icons', 'font', 'fonts');
const fontsDest = path.join(vendorsDir, 'bootstrap-icons', 'fonts');

if (fs.existsSync(fontsSrc)) {
    fs.readdirSync(fontsSrc).forEach(file => {
        copyFile(path.join(fontsSrc, file), path.join(fontsDest, file));
    });
} else {
    console.warn(`Warning: Bootstrap Icons fonts dir not found: ${fontsSrc}`);
}

console.log('Assets copied successfully.');
