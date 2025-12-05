import * as THREE from 'three';

// Simple Mobile Detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const CONFIG = {
    // Drop to 6000 on mobile, keep 15000 on desktop
    particleCount: isMobile ? 6000 : 15000, 
    baseColor: 0x00ffff,
    handTension: 0.5,
    
    targetSystemPosition: new THREE.Vector3(0, 0, 0),
    targetSystemRotation: new THREE.Vector3(0, 0, 0),
    
    // Export this check so other files can use it if needed
    isMobile: isMobile
};