// AfGlam - AR Experience JavaScript
class AfGlamARExperience {
    constructor() {
        this.currentEffect = 'butterfly';
        this.isARActive = false;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.effects = {};
        
        this.init();
    }
    
    init() {
        this.setupARScene();
        this.createEffects();
        this.setupEventListeners();
    }
    
    setupARScene() {
        // Wait for A-Frame to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.scene = document.querySelector('a-scene');
            if (this.scene) {
                this.scene.addEventListener('renderstart', () => {
                    this.isARActive = true;
                    console.log('AR Scene initialized');
                });
                
                // Handle target detection
                this.scene.addEventListener('targetFound', () => {
                    this.onTargetFound();
                });
                
                this.scene.addEventListener('targetLost', () => {
                    this.onTargetLost();
                });
            }
        });
    }
    
    createEffects() {
        // Create 3D effects for pets
        this.effects = {
            butterfly: this.createButterflyWings(),
            angel: this.createAngelWings(),
            sparkle: this.createSparkleEffect()
        };
    }
    
    createButterflyWings() {
        // Create butterfly wings effect using A-Frame primitives
        const wings = document.createElement('a-entity');
        wings.id = 'butterfly-wings';
        wings.setAttribute('position', '0 0.5 0');
        wings.setAttribute('scale', '0.5 0.5 0.5');
        wings.setAttribute('visible', 'true');
        
        // Left wing
        const leftWing = document.createElement('a-plane');
        leftWing.setAttribute('position', '-0.3 0 0');
        leftWing.setAttribute('rotation', '0 0 -30');
        leftWing.setAttribute('width', '0.8');
        leftWing.setAttribute('height', '0.6');
        leftWing.setAttribute('color', '#ff69b4');
        leftWing.setAttribute('opacity', '0.8');
        leftWing.setAttribute('animation', 'property: rotation; to: 0 0 -45; dur: 2000; loop: true; dir: alternate; easing: easeInOut');
        
        // Right wing
        const rightWing = document.createElement('a-plane');
        rightWing.setAttribute('position', '0.3 0 0');
        rightWing.setAttribute('rotation', '0 0 30');
        rightWing.setAttribute('width', '0.8');
        rightWing.setAttribute('height', '0.6');
        rightWing.setAttribute('color', '#ff69b4');
        rightWing.setAttribute('opacity', '0.8');
        rightWing.setAttribute('animation', 'property: rotation; to: 0 0 45; dur: 2000; loop: true; dir: alternate; easing: easeInOut');
        
        // Add sparkles
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('a-sphere');
            sparkle.setAttribute('position', `${(Math.random() - 0.5) * 0.8} ${Math.random() * 0.5} ${Math.random() * 0.3}`);
            sparkle.setAttribute('radius', '0.02');
            sparkle.setAttribute('color', '#ffd700');
            sparkle.setAttribute('animation', `property: scale; to: 1.5 1.5 1.5; dur: ${1000 + Math.random() * 1000}; loop: true; dir: alternate; easing: easeInOut`);
            wings.appendChild(sparkle);
        }
        
        wings.appendChild(leftWing);
        wings.appendChild(rightWing);
        
        return wings;
    }
    
    createAngelWings() {
        // Create angel wings effect
        const wings = document.createElement('a-entity');
        wings.id = 'angel-wings';
        wings.setAttribute('position', '0 0.5 0');
        wings.setAttribute('scale', '0.5 0.5 0.5');
        wings.setAttribute('visible', 'false');
        
        // Left angel wing
        const leftWing = document.createElement('a-plane');
        leftWing.setAttribute('position', '-0.4 0 0');
        leftWing.setAttribute('rotation', '0 0 -20');
        leftWing.setAttribute('width', '1.2');
        leftWing.setAttribute('height', '0.8');
        leftWing.setAttribute('color', '#ffffff');
        leftWing.setAttribute('opacity', '0.9');
        leftWing.setAttribute('animation', 'property: position; to: -0.5 0.1 0; dur: 3000; loop: true; dir: alternate; easing: easeInOut');
        
        // Right angel wing
        const rightWing = document.createElement('a-plane');
        rightWing.setAttribute('position', '0.4 0 0');
        rightWing.setAttribute('rotation', '0 0 20');
        rightWing.setAttribute('width', '1.2');
        rightWing.setAttribute('height', '0.8');
        rightWing.setAttribute('color', '#ffffff');
        rightWing.setAttribute('opacity', '0.9');
        rightWing.setAttribute('animation', 'property: position; to: 0.5 0.1 0; dur: 3000; loop: true; dir: alternate; easing: easeInOut');
        
        // Add golden glow
        const glow = document.createElement('a-sphere');
        glow.setAttribute('position', '0 0.3 0');
        glow.setAttribute('radius', '0.3');
        glow.setAttribute('color', '#ffd700');
        glow.setAttribute('opacity', '0.3');
        glow.setAttribute('animation', 'property: scale; to: 1.2 1.2 1.2; dur: 2000; loop: true; dir: alternate; easing: easeInOut');
        
        wings.appendChild(leftWing);
        wings.appendChild(rightWing);
        wings.appendChild(glow);
        
        return wings;
    }
    
    createSparkleEffect() {
        // Create sparkle effect
        const sparkles = document.createElement('a-entity');
        sparkles.id = 'sparkle-effect';
        sparkles.setAttribute('position', '0 0.3 0');
        sparkles.setAttribute('scale', '0.3 0.3 0.3');
        sparkles.setAttribute('visible', 'false');
        
        // Create multiple sparkles
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('a-sphere');
            const angle = (i / 8) * Math.PI * 2;
            const radius = 0.4;
            
            sparkle.setAttribute('position', `${Math.cos(angle) * radius} ${Math.sin(angle) * radius * 0.5} 0`);
            sparkle.setAttribute('radius', '0.03');
            sparkle.setAttribute('color', this.getRandomSparkleColor());
            sparkle.setAttribute('animation', `property: scale; to: 2 2 2; dur: ${800 + Math.random() * 1200}; loop: true; dir: alternate; easing: easeInOut`);
            
            sparkles.appendChild(sparkle);
        }
        
        // Add central sparkle
        const centralSparkle = document.createElement('a-sphere');
        centralSparkle.setAttribute('position', '0 0 0');
        centralSparkle.setAttribute('radius', '0.05');
        centralSparkle.setAttribute('color', '#ffd700');
        centralSparkle.setAttribute('animation', 'property: scale; to: 3 3 3; dur: 1500; loop: true; dir: alternate; easing: easeInOut');
        
        sparkles.appendChild(centralSparkle);
        
        return sparkles;
    }
    
    getRandomSparkleColor() {
        const colors = ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd', '#f0e68c'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setupEventListeners() {
        // Listen for effect changes
        document.addEventListener('effectChanged', (e) => {
            this.switchEffect(e.detail.effect);
        });
    }
    
    switchEffect(effectName) {
        this.currentEffect = effectName;
        
        // Hide all effects
        Object.values(this.effects).forEach(effect => {
            effect.setAttribute('visible', 'false');
        });
        
        // Show selected effect
        if (this.effects[effectName]) {
            this.effects[effectName].setAttribute('visible', 'true');
            this.addEffectToScene(this.effects[effectName]);
        }
    }
    
    addEffectToScene(effect) {
        // Find the anchor element in the AR scene
        const anchor = document.querySelector('a-anchor');
        if (anchor) {
            // Remove existing effects
            const existingEffects = anchor.querySelectorAll('[id$="-wings"], [id$="-effect"]');
            existingEffects.forEach(el => el.remove());
            
            // Add new effect
            anchor.appendChild(effect);
        }
    }
    
    onTargetFound() {
        console.log('Pet target found!');
        this.showEffect();
        
        // Add success animation
        this.addSuccessAnimation();
    }
    
    onTargetLost() {
        console.log('Pet target lost');
        this.hideEffect();
    }
    
    showEffect() {
        if (this.effects[this.currentEffect]) {
            this.effects[this.currentEffect].setAttribute('visible', 'true');
        }
    }
    
    hideEffect() {
        Object.values(this.effects).forEach(effect => {
            effect.setAttribute('visible', 'false');
        });
    }
    
    addSuccessAnimation() {
        // Create success particles
        const successParticles = document.createElement('a-entity');
        successParticles.setAttribute('position', '0 0.5 0');
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('a-sphere');
            particle.setAttribute('position', `${(Math.random() - 0.5) * 2} ${Math.random() * 1} ${Math.random() * 0.5}`);
            particle.setAttribute('radius', '0.02');
            particle.setAttribute('color', '#ffd700');
            particle.setAttribute('animation', `property: position; to: ${(Math.random() - 0.5) * 4} ${Math.random() * 2 + 1} ${Math.random() * 2}; dur: 2000; easing: easeOut`);
            
            successParticles.appendChild(particle);
        }
        
        const anchor = document.querySelector('a-anchor');
        if (anchor) {
            anchor.appendChild(successParticles);
            
            // Remove particles after animation
            setTimeout(() => {
                successParticles.remove();
            }, 2000);
        }
    }
    
    // Method to capture AR scene
    captureScene() {
        if (!this.scene || !this.isARActive) {
            console.error('AR scene not ready');
            return null;
        }
        
        try {
            // Get the renderer
            const renderer = this.scene.renderer;
            const camera = this.scene.camera;
            
            // Create a temporary canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            // Set canvas size
            canvas.width = renderer.domElement.width;
            canvas.height = renderer.domElement.height;
            
            // Render the scene
            renderer.render(renderer.scene, camera);
            
            // Get the rendered image
            const imageData = renderer.domElement.toDataURL('image/png');
            
            return imageData;
        } catch (error) {
            console.error('Error capturing AR scene:', error);
            return null;
        }
    }
    
    // Method to add custom 3D models
    loadCustomModel(modelUrl, position = '0 0 0', scale = '1 1 1') {
        return new Promise((resolve, reject) => {
            const model = document.createElement('a-entity');
            model.setAttribute('gltf-model', modelUrl);
            model.setAttribute('position', position);
            model.setAttribute('scale', scale);
            
            model.addEventListener('model-loaded', () => {
                resolve(model);
            });
            
            model.addEventListener('model-error', (error) => {
                reject(error);
            });
            
            // Add to scene
            const anchor = document.querySelector('a-anchor');
            if (anchor) {
                anchor.appendChild(model);
            }
        });
    }
}

// Initialize AR experience
let arExperience;

document.addEventListener('DOMContentLoaded', () => {
    arExperience = new AfGlamARExperience();
});

// Export for global access
window.AfGlamARExperience = AfGlamARExperience; 