import { CONFIG } from './config.js';

export function initTracking() {
    const videoElement = document.getElementById('video-feed');
    const loader = document.getElementById('loader');

    function onResults(results) {
        loader.style.display = 'none';

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            let totalTension = 0;
            let avgX = 0;
            let avgY = 0;
            const count = results.multiHandLandmarks.length;
            
            results.multiHandLandmarks.forEach((landmarks) => {
                const wrist = landmarks[0];
                const indexTip = landmarks[8];
                const middleTip = landmarks[12];
                
                const d1 = Math.sqrt(Math.pow(indexTip.x - wrist.x, 2) + Math.pow(indexTip.y - wrist.y, 2));
                const d2 = Math.sqrt(Math.pow(middleTip.x - wrist.x, 2) + Math.pow(middleTip.y - wrist.y, 2));
                
                const rawVal = (d1 + d2) / 2;
                let tension = (rawVal - 0.1) * 4.0;
                if(tension < 0) tension = 0;
                if(tension > 1.5) tension = 1.5;
                totalTension += tension;

                // Center of Palm approx
                avgX += (1 - landmarks[9].x); 
                avgY += landmarks[9].y;
            });

            // Smooth interpolation for tension
            const targetTension = totalTension / count;
            CONFIG.handTension += (targetTension - CONFIG.handTension) * 0.1;

            // Update Target Position & Rotation
            avgX /= count;
            avgY /= count;

            CONFIG.targetSystemPosition.x = (avgX - 0.5) * 30; 
            CONFIG.targetSystemPosition.y = -(avgY - 0.5) * 20; 

            CONFIG.targetSystemRotation.y = (avgX - 0.5) * 2; // Yaw
            CONFIG.targetSystemRotation.x = (avgY - 0.5) * 2; // Pitch
            
        } else {
            CONFIG.handTension += (0.5 - CONFIG.handTension) * 0.05;
            CONFIG.targetSystemPosition.set(0, 0, 0);
            CONFIG.targetSystemRotation.set(0, 0, 0);
        }
    }

    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);

    const cameraUtils = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({image: videoElement});
        },
        width: 320,
        height: 240
    });
    
    cameraUtils.start();
}