export function updateTargets(shape, count, targetPositions) {
    for (let i = 0; i < count; i++) {
        let x, y, z;
        const idx = i * 3;

        if (shape === 'heart') {
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            x = 16 * Math.pow(Math.sin(theta), 3) * Math.cos(phi);
            y = 13 * Math.cos(theta) - 5 * Math.cos(2*theta) - 2 * Math.cos(3*theta) - Math.cos(4*theta);
            z = 16 * Math.pow(Math.sin(theta), 3) * Math.sin(phi);
            x *= 0.8; y *= 0.8; z *= 0.8; 
        } else if (shape === 'saturn') {
            if (i < count * 0.7) { 
                const r = 8;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                x = r * Math.sin(phi) * Math.cos(theta);
                y = r * Math.sin(phi) * Math.sin(theta);
                z = r * Math.cos(phi);
            } else { 
                const r = 12 + Math.random() * 6;
                const theta = Math.random() * Math.PI * 2;
                x = r * Math.cos(theta);
                z = r * Math.sin(theta);
                y = (Math.random() - 0.5) * 0.5;
            }
             const tilt = 0.4;
             const tx = x * Math.cos(tilt) - y * Math.sin(tilt);
             const ty = x * Math.sin(tilt) + y * Math.cos(tilt);
             x = tx; y = ty;
        } else if (shape === 'flower') {
            const k = 4; 
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 10 + 5 * Math.cos(k * theta) * Math.sin(phi);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        } else { // fireworks
            const r = 20 * Math.random();
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        }

        targetPositions[idx] = x;
        targetPositions[idx+1] = y;
        targetPositions[idx+2] = z;
    }
}