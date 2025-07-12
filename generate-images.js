import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the images directories exist
const levels = ['easy', 'medium', 'hard', 'expert'];
levels.forEach(level => {
    const dir = path.join(__dirname, 'public', 'images', level);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

function drawBaseScene(ctx) {
    // Background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, 600, 400);
    
    // Ground
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 300, 600, 100);
    
    // Sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(500, 80, 40, 0, 2 * Math.PI);
    ctx.fill();
    
    // House
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(100, 200, 150, 100);
    
    // Roof
    ctx.fillStyle = '#A52A2A';
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(175, 150);
    ctx.lineTo(250, 200);
    ctx.fill();
    
    // Door
    ctx.fillStyle = '#654321';
    ctx.fillRect(160, 250, 30, 50);
    
    // Windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(120, 220, 25, 25);
    ctx.fillRect(205, 220, 25, 25);
    
    // Tree
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(400, 180, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(390, 230, 20, 70);
    
    // Flowers
    ctx.fillStyle = '#FF69B4';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(50 + i * 30, 350, 8, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function generateEasyImages() {
    console.log('Generating Easy level images...');
    
    const canvas1 = createCanvas(600, 400);
    const canvas2 = createCanvas(600, 400);
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    // Draw base scene on both
    drawBaseScene(ctx1);
    drawBaseScene(ctx2);
    
    // Add differences to image 2
    // Difference 1: Extra cloud
    ctx2.fillStyle = '#FFFFFF';
    ctx2.beginPath();
    ctx2.arc(150, 100, 20, 0, 2 * Math.PI);
    ctx2.arc(170, 100, 25, 0, 2 * Math.PI);
    ctx2.arc(190, 100, 20, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 2: Different colored window
    ctx2.fillStyle = '#FFB6C1';
    ctx2.fillRect(120, 220, 25, 25);
    
    // Difference 3: Extra flower
    ctx2.fillStyle = '#FF69B4';
    ctx2.beginPath();
    ctx2.arc(200, 350, 8, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Save images
    const buffer1 = canvas1.toBuffer('image/png');
    const buffer2 = canvas2.toBuffer('image/png');
    
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'easy', 'img1.png'), buffer1);
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'easy', 'img2.png'), buffer2);
    
    console.log('Easy level images saved!');
}

function generateMediumImages() {
    console.log('Generating Medium level images...');
    
    const canvas1 = createCanvas(600, 400);
    const canvas2 = createCanvas(600, 400);
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    drawBaseScene(ctx1);
    drawBaseScene(ctx2);
    
    // Add 5 differences to image 2
    // Difference 1: Extra cloud
    ctx2.fillStyle = '#FFFFFF';
    ctx2.beginPath();
    ctx2.arc(150, 100, 20, 0, 2 * Math.PI);
    ctx2.arc(170, 100, 25, 0, 2 * Math.PI);
    ctx2.arc(190, 100, 20, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 2: Different colored window
    ctx2.fillStyle = '#FFB6C1';
    ctx2.fillRect(120, 220, 25, 25);
    
    // Difference 3: Extra flower
    ctx2.fillStyle = '#FF69B4';
    ctx2.beginPath();
    ctx2.arc(200, 350, 8, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 4: Bird on tree
    ctx2.fillStyle = '#000000';
    ctx2.beginPath();
    ctx2.arc(420, 160, 5, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 5: Different door color
    ctx2.fillStyle = '#8B0000';
    ctx2.fillRect(160, 250, 30, 50);
    
    // Save images
    const buffer1 = canvas1.toBuffer('image/png');
    const buffer2 = canvas2.toBuffer('image/png');
    
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'medium', 'img1.png'), buffer1);
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'medium', 'img2.png'), buffer2);
    
    console.log('Medium level images saved!');
}

function generateHardImages() {
    console.log('Generating Hard level images...');
    
    const canvas1 = createCanvas(600, 400);
    const canvas2 = createCanvas(600, 400);
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    drawBaseScene(ctx1);
    drawBaseScene(ctx2);
    
    // Add 7 differences to image 2
    // Difference 1: Extra cloud
    ctx2.fillStyle = '#FFFFFF';
    ctx2.beginPath();
    ctx2.arc(150, 100, 20, 0, 2 * Math.PI);
    ctx2.arc(170, 100, 25, 0, 2 * Math.PI);
    ctx2.arc(190, 100, 20, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 2: Different colored window
    ctx2.fillStyle = '#FFB6C1';
    ctx2.fillRect(120, 220, 25, 25);
    
    // Difference 3: Extra flower
    ctx2.fillStyle = '#FF69B4';
    ctx2.beginPath();
    ctx2.arc(200, 350, 8, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 4: Bird on tree
    ctx2.fillStyle = '#000000';
    ctx2.beginPath();
    ctx2.arc(420, 160, 5, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 5: Different door color
    ctx2.fillStyle = '#8B0000';
    ctx2.fillRect(160, 250, 30, 50);
    
    // Difference 6: Extra tree
    ctx2.fillStyle = '#228B22';
    ctx2.beginPath();
    ctx2.arc(300, 180, 30, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.fillStyle = '#8B4513';
    ctx2.fillRect(295, 210, 10, 40);
    
    // Difference 7: Different sun color
    ctx2.fillStyle = '#FF4500';
    ctx2.beginPath();
    ctx2.arc(500, 80, 40, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Save images
    const buffer1 = canvas1.toBuffer('image/png');
    const buffer2 = canvas2.toBuffer('image/png');
    
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'hard', 'img1.png'), buffer1);
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'hard', 'img2.png'), buffer2);
    
    console.log('Hard level images saved!');
}

function generateExpertImages() {
    console.log('Generating Expert level images...');
    
    const canvas1 = createCanvas(600, 400);
    const canvas2 = createCanvas(600, 400);
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    drawBaseScene(ctx1);
    drawBaseScene(ctx2);
    
    // Add 10 differences to image 2
    // Difference 1: Extra cloud
    ctx2.fillStyle = '#FFFFFF';
    ctx2.beginPath();
    ctx2.arc(150, 100, 20, 0, 2 * Math.PI);
    ctx2.arc(170, 100, 25, 0, 2 * Math.PI);
    ctx2.arc(190, 100, 20, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 2: Different colored window
    ctx2.fillStyle = '#FFB6C1';
    ctx2.fillRect(120, 220, 25, 25);
    
    // Difference 3: Extra flower
    ctx2.fillStyle = '#FF69B4';
    ctx2.beginPath();
    ctx2.arc(200, 350, 8, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 4: Bird on tree
    ctx2.fillStyle = '#000000';
    ctx2.beginPath();
    ctx2.arc(420, 160, 5, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 5: Different door color
    ctx2.fillStyle = '#8B0000';
    ctx2.fillRect(160, 250, 30, 50);
    
    // Difference 6: Extra tree
    ctx2.fillStyle = '#228B22';
    ctx2.beginPath();
    ctx2.arc(300, 180, 30, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.fillStyle = '#8B4513';
    ctx2.fillRect(295, 210, 10, 40);
    
    // Difference 7: Different sun color
    ctx2.fillStyle = '#FF4500';
    ctx2.beginPath();
    ctx2.arc(500, 80, 40, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Difference 8: Extra window
    ctx2.fillStyle = '#87CEEB';
    ctx2.fillRect(280, 220, 20, 20);
    
    // Difference 9: Different ground color
    ctx2.fillStyle = '#32CD32';
    ctx2.fillRect(0, 300, 600, 100);
    
    // Difference 10: Extra flower in different color
    ctx2.fillStyle = '#FFD700';
    ctx2.beginPath();
    ctx2.arc(250, 350, 8, 0, 2 * Math.PI);
    ctx2.fill();
    
    // Save images
    const buffer1 = canvas1.toBuffer('image/png');
    const buffer2 = canvas2.toBuffer('image/png');
    
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'expert', 'img1.png'), buffer1);
    fs.writeFileSync(path.join(__dirname, 'public', 'images', 'expert', 'img2.png'), buffer2);
    
    console.log('Expert level images saved!');
}

// Generate all images
console.log('Starting image generation...');
generateEasyImages();
generateMediumImages();
generateHardImages();
generateExpertImages();
console.log('All images generated successfully!'); 


//The above function is used to generate the images for the easy, medium, hard and expert levels.
//The images are generated in the public/images directory.
//The above func file was written by ChatGPT so no need to feel intimidated by it.