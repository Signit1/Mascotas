// AfGlam - Main JavaScript
class AfGlamApp {
    constructor() {
        this.currentScreen = 'welcome';
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            ar: document.getElementById('ar-screen'),
            qrDemo: document.getElementById('qr-demo-screen')
        };
        
        this.init();
    }
    
    init() {
        this.hideLoadingScreen();
        this.setupEventListeners();
        this.generateQRCode();
        this.setupARExperience();
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('start-ar-btn').addEventListener('click', () => {
            this.showScreen('ar');
        });
        
        document.getElementById('qr-demo-btn').addEventListener('click', () => {
            this.showScreen('qrDemo');
        });
        
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showScreen('welcome');
        });
        
        document.getElementById('qr-back-btn').addEventListener('click', () => {
            this.showScreen('welcome');
        });
        
        // AR effect buttons
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchEffect(e.target.closest('.effect-btn').dataset.effect);
            });
        });
        
        // Capture functionality
        document.getElementById('capture-btn').addEventListener('click', () => {
            this.captureAR();
        });
        
        // Modal functionality
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadImage();
        });
        
        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareImage();
        });
        
        // Close modal on outside click
        document.getElementById('capture-modal').addEventListener('click', (e) => {
            if (e.target.id === 'capture-modal') {
                this.closeModal();
            }
        });
    }
    
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
            
            // Special handling for AR screen
            if (screenName === 'ar') {
                this.startARExperience();
            }
        }
    }
    
    generateQRCode() {
        const qrContainer = document.getElementById('qr-code');
        const currentURL = window.location.href;
        
        // Generate QR code with AfGlam branding
        QRCode.toCanvas(qrContainer, currentURL, {
            width: 200,
            height: 200,
            color: {
                dark: '#1a1a1a',
                light: '#ffffff'
            },
            margin: 2,
            errorCorrectionLevel: 'H'
        }, (error, canvas) => {
            if (error) {
                console.error('Error generating QR code:', error);
                return;
            }
            
            // Add AfGlam logo overlay to QR code
            this.addLogoToQR(canvas);
        });
    }
    
    addLogoToQR(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const logoSize = 30;
        
        // Draw logo background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(centerX - logoSize/2, centerY - logoSize/2, logoSize, logoSize);
        
        // Draw AfGlam text
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 12px Montserrat';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AfGlam', centerX, centerY);
    }
    
    switchEffect(effect) {
        // Update active button
        document.querySelectorAll('.effect-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-effect="${effect}"]`).classList.add('active');
        
        // Switch AR effects
        const butterflyWings = document.getElementById('butterfly-wings');
        const angelWings = document.getElementById('angel-wings');
        const sparkleEffect = document.getElementById('sparkle-effect');
        
        // Hide all effects
        butterflyWings.setAttribute('visible', 'false');
        angelWings.setAttribute('visible', 'false');
        sparkleEffect.setAttribute('visible', 'false');
        
        // Show selected effect
        switch(effect) {
            case 'butterfly':
                butterflyWings.setAttribute('visible', 'true');
                break;
            case 'angel':
                angelWings.setAttribute('visible', 'true');
                break;
            case 'sparkle':
                sparkleEffect.setAttribute('visible', 'true');
                break;
        }
        
        // Add animation class
        this.addEffectAnimation(effect);
    }
    
    addEffectAnimation(effect) {
        const effectElement = document.getElementById(`${effect}-${effect === 'sparkle' ? 'effect' : 'wings'}`);
        
        // Remove existing animations
        effectElement.removeAttribute('animation');
        
        // Add new animation based on effect
        switch(effect) {
            case 'butterfly':
                effectElement.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 3000; loop: true; easing: linear');
                break;
            case 'angel':
                effectElement.setAttribute('animation', 'property: position; to: 0 0.7 0; dur: 2000; loop: true; easing: easeInOut; dir: alternate');
                break;
            case 'sparkle':
                effectElement.setAttribute('animation', 'property: scale; to: 0.5 0.5 0.5; dur: 1500; loop: true; easing: easeInOut; dir: alternate');
                break;
        }
    }
    
    startARExperience() {
        // Check browser compatibility first
        if (!this.checkBrowserCompatibility()) {
            this.showCompatibilityError();
            return;
        }
        
        // Request camera permissions
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    console.log('Camera access granted');
                    // AR scene will handle the stream
                })
                .catch(error => {
                    console.error('Camera access denied:', error);
                    this.showCameraError(error);
                });
        } else {
            this.showCameraError(new Error('WebRTC not supported'));
        }
    }
    
    checkBrowserCompatibility() {
        const ua = navigator.userAgent.toLowerCase();
        const isBrave = navigator.brave && navigator.brave.isBrave();
        const isChrome = ua.includes('chrome') && !ua.includes('edg');
        const isSafari = ua.includes('safari') && !ua.includes('chrome');
        const isFirefox = ua.includes('firefox');
        
        // Check WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
            console.error('WebGL not supported');
            return false;
        }
        
        // Check WebRTC support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('WebRTC not supported');
            return false;
        }
        
        // Check HTTPS requirement (except for localhost)
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            console.error('HTTPS required for WebAR');
            return false;
        }
        
        return true;
    }
    
    showCompatibilityError() {
        const arContainer = document.querySelector('.ar-container');
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div>
                    <h3>⚠️ Problema de Compatibilidad</h3>
                    <p>Tu navegador o dispositivo no es compatible con WebAR.</p>
                    <div style="margin: 20px 0;">
                        <h4>Soluciones recomendadas:</h4>
                        <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                            <li>Usa Chrome o Safari</li>
                            <li>Actualiza tu navegador</li>
                            <li>Desactiva extensiones de privacidad</li>
                            <li>Usa un dispositivo móvil</li>
                        </ul>
                    </div>
                    <a href="/test-compatibility.html" style="background: #d4af37; color: #1a1a1a; padding: 10px 20px; border-radius: 25px; text-decoration: none; display: inline-block; margin: 10px;">
                        🔍 Test de Compatibilidad
                    </a>
                    <br>
                    <button onclick="location.reload()" style="background: #d4af37; border: none; padding: 10px 20px; border-radius: 25px; color: #1a1a1a; cursor: pointer; margin: 10px;">
                        🔄 Reintentar
                    </button>
                </div>
            </div>
        `;
    }
    
    showCameraError(error) {
        const arContainer = document.querySelector('.ar-container');
        let errorMessage = 'Para disfrutar de la experiencia AR, necesitamos acceso a tu cámara.';
        let solutionMessage = '';
        
        if (error) {
            if (error.name === 'NotAllowedError') {
                errorMessage = 'Acceso a cámara denegado.';
                solutionMessage = 'Por favor, permite acceso a la cámara en tu navegador.';
            } else if (error.name === 'NotFoundError') {
                errorMessage = 'No se encontró cámara en tu dispositivo.';
                solutionMessage = 'Asegúrate de tener una cámara conectada y funcionando.';
            } else if (error.name === 'NotSupportedError') {
                errorMessage = 'WebRTC no es soportado en tu navegador.';
                solutionMessage = 'Usa Chrome, Safari o Firefox actualizado.';
            } else {
                errorMessage = `Error de cámara: ${error.message}`;
                solutionMessage = 'Intenta recargar la página o usar otro navegador.';
            }
        }
        
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div>
                    <h3>📷 ${errorMessage}</h3>
                    <p>${solutionMessage}</p>
                    <div style="margin: 20px 0;">
                        <h4>Soluciones:</h4>
                        <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                            <li>Permite acceso a la cámara cuando se solicite</li>
                            <li>Verifica que no haya otras apps usando la cámara</li>
                            <li>Usa Chrome o Safari en lugar de Brave</li>
                            <li>Desactiva extensiones de privacidad</li>
                        </ul>
                    </div>
                    <a href="/test-compatibility.html" style="background: #d4af37; color: #1a1a1a; padding: 10px 20px; border-radius: 25px; text-decoration: none; display: inline-block; margin: 10px;">
                        🔍 Test de Compatibilidad
                    </a>
                    <br>
                    <button onclick="location.reload()" style="background: #d4af37; border: none; padding: 10px 20px; border-radius: 25px; color: #1a1a1a; cursor: pointer; margin: 10px;">
                        🔄 Reintentar
                    </button>
                </div>
            </div>
        `;
    }
    
    captureAR() {
        const scene = document.querySelector('a-scene');
        if (!scene) return;
        
        // Capture the AR scene
        scene.renderer.render(scene.object3D, scene.camera);
        
        // Create canvas from renderer
        const canvas = scene.renderer.domElement;
        const captureCanvas = document.getElementById('capture-canvas');
        const ctx = captureCanvas.getContext('2d');
        
        // Set canvas size
        captureCanvas.width = canvas.width;
        captureCanvas.height = canvas.height;
        
        // Draw the captured frame
        ctx.drawImage(canvas, 0, 0);
        
        // Show modal
        this.showModal();
    }
    
    showModal() {
        document.getElementById('capture-modal').classList.add('active');
    }
    
    closeModal() {
        document.getElementById('capture-modal').classList.remove('active');
    }
    
    downloadImage() {
        const canvas = document.getElementById('capture-canvas');
        const link = document.createElement('a');
        link.download = `afglam-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }
    
    shareImage() {
        const canvas = document.getElementById('capture-canvas');
        
        if (navigator.share) {
            canvas.toBlob(blob => {
                const file = new File([blob], 'afglam-share.png', { type: 'image/png' });
                navigator.share({
                    title: 'AfGlam - Mi mascota mágica',
                    text: '¡Mira la experiencia mágica de mi mascota con AfGlam!',
                    files: [file]
                });
            });
        } else {
            // Fallback: copy to clipboard
            this.copyToClipboard();
        }
    }
    
    copyToClipboard() {
        const canvas = document.getElementById('capture-canvas');
        
        canvas.toBlob(blob => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
                this.showNotification('Imagen copiada al portapapeles');
            }).catch(() => {
                this.showNotification('No se pudo copiar la imagen');
            });
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a1a1a;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Montserrat, sans-serif;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    setupARExperience() {
        // Initialize AR experience when A-Frame is ready
        document.addEventListener('DOMContentLoaded', () => {
            const scene = document.querySelector('a-scene');
            if (scene) {
                scene.addEventListener('renderstart', () => {
                    console.log('AR scene started');
                });
                
                scene.addEventListener('targetFound', () => {
                    console.log('Target found');
                    this.showTargetFoundNotification();
                });
                
                scene.addEventListener('targetLost', () => {
                    console.log('Target lost');
                });
            }
        });
    }
    
    showTargetFoundNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(212, 175, 55, 0.9);
            color: #1a1a1a;
            padding: 20px 30px;
            border-radius: 15px;
            z-index: 10000;
            font-family: Montserrat, sans-serif;
            font-weight: 600;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
            animation: fadeInOut 2s ease-in-out;
        `;
        notification.textContent = '¡Mascota detectada! ✨';
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.afGlamApp = new AfGlamApp();
});

// Handle service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 