import * as THREE from 'three';

export const CONFIG = {
    particleCount: 15000,
    baseColor: 0x00ffff,
    handTension: 0.5, // 0 to 1
    
    // Smoothing targets for movement and rotation
    targetSystemPosition: new THREE.Vector3(0, 0, 0),
    targetSystemRotation: new THREE.Vector3(0, 0, 0)
};