const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

// Set fixed canvas size
const FIXED_CANVAS_WIDTH = 800;
const FIXED_CANVAS_HEIGHT = 800;
const FIXED_GLOBE_RADIUS = 600;

function setCanvasSize() {
    canvas.width = FIXED_CANVAS_WIDTH;
    canvas.height = FIXED_CANVAS_HEIGHT;

    canvasWidth = FIXED_CANVAS_WIDTH;
    canvasHeight = FIXED_CANVAS_HEIGHT;

    canvasCenterX = canvasWidth / 2;
    canvasCenterY = canvasHeight / 2;
}

setCanvasSize();

let rotationAngle = 0;
let dotsArray = [];

const TOTAL_DOTS = 500;
const DOT_SIZE = 4;
let globeRadius = FIXED_GLOBE_RADIUS;
let globeCenterZ = -globeRadius;
let perspectiveDepth = 800;

function createDot(x, y, z) {
    const dot = {
        x,
        y,
        z,
        xProjected: 0,
        yProjected: 0,
        sizeProjected: 0
    };

    function project(sinAngle, cosAngle) {
        const rotatedX = cosAngle * dot.x + sinAngle * (dot.z - globeCenterZ);
        const rotatedZ = -sinAngle * dot.x + cosAngle * (dot.z - globeCenterZ) + globeCenterZ;

        const scaleFactor = perspectiveDepth / (perspectiveDepth - rotatedZ);

        dot.xProjected = rotatedX * scaleFactor + canvasCenterX;
        dot.yProjected = dot.y * scaleFactor + canvasCenterY;
        dot.sizeProjected = DOT_SIZE * scaleFactor;
    }

    function draw(sinAngle, cosAngle) {
        project(sinAngle, cosAngle);
        ctx.beginPath();
        ctx.arc(dot.xProjected, dot.yProjected, dot.sizeProjected, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    return { project, draw };
}

function initializeDots() {
    dotsArray = [];

    for (let i = 0; i < TOTAL_DOTS; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);

        const x = globeRadius * Math.sin(phi) * Math.cos(theta);
        const y = globeRadius * Math.sin(phi) * Math.sin(theta);
        const z = globeRadius * Math.cos(phi) + globeCenterZ;

        dotsArray.push(createDot(x, y, z));
    }
}

function renderScene(timeStamp) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    rotationAngle = timeStamp * 0.00004;
    const sinAngle = Math.sin(rotationAngle);
    const cosAngle = Math.cos(rotationAngle);

    dotsArray.forEach(dot => dot.draw(sinAngle, cosAngle));

    window.requestAnimationFrame(renderScene);
}

initializeDots();
window.requestAnimationFrame(renderScene);
