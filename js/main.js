import * as THREE from 'three';
import { CONFIG } from './config.js';
import { initScene, createParticles } from './scene.js';
import { updateTargets } from './shapes.js';
import { initTracking } from './tracking.js';

// 1. Setup Scene
const { scene, camera, renderer } = initScene();

// 2. Setup Particles
const { particles, geometry, material, targetPositions } = createParticles();
scene.add(particles);

// Initialize Default Shape
updateTargets('fireworks', CONFIG.particleCount, targetPositions);

// 3. Setup Tracking
initTracking();

// 4. UI Event Listeners
document.getElementById('color-picker').addEventListener('input', (e) => {
    material.color.set(e.target.value);
});

const btns = document.querySelectorAll('.tmpl-btn');
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        btns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const shape = e.target.getAttribute('data-shape');
        updateTargets(shape, CONFIG.particleCount, targetPositions);
    });
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    const expansion = 0.2 + (CONFIG.handTension * 2.5);
    const positionsArray = geometry.attributes.position.array;

    for(let i = 0; i < CONFIG.particleCount; i++) {
        const idx = i * 3;
        
        const tx = targetPositions[idx];
        const ty = targetPositions[idx+1];
        const tz = targetPositions[idx+2];

        const targetX = tx * expansion;
        const targetY = ty * expansion;
        const targetZ = tz * expansion;

        const speed = 0.05; 
        
        const noiseX = Math.sin(time + i) * 0.05 * expansion;
        const noiseY = Math.cos(time + i * 0.5) * 0.05 * expansion;

        positionsArray[idx] += (targetX - positionsArray[idx]) * speed + noiseX;
        positionsArray[idx+1] += (targetY - positionsArray[idx+1]) * speed + noiseY;
        positionsArray[idx+2] += (targetZ - positionsArray[idx+2]) * speed;
    }

    geometry.attributes.position.needsUpdate = true;
    
    // Movement & Rotation
    particles.position.lerp(CONFIG.targetSystemPosition, 0.1);

    const idleRotation = time * 0.1;
    particles.rotation.x += (CONFIG.targetSystemRotation.x - particles.rotation.x) * 0.1;
    particles.rotation.y += ((CONFIG.targetSystemRotation.y + idleRotation) - particles.rotation.y) * 0.1;

    renderer.render(scene, camera);
}

animate();