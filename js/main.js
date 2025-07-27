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
        
        // Show camera permission request UI
        this.showCameraPermissionRequest();
    }
    
    showCameraPermissionRequest() {
        const arContainer = document.querySelector('.ar-container');
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div style="max-width: 500px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">📷</div>
                    <h3>Permisos de Cámara Requeridos</h3>
                    <p style="margin: 20px 0; line-height: 1.6;">
                        Para disfrutar de la experiencia mágica de AfGlam, necesitamos acceso a tu cámara.
                        <br><br>
                        <strong>¿Qué haremos con tu cámara?</strong>
                        <br>
                        • Solo la usaremos para mostrar efectos AR en tu mascota
                        <br>
                        • No guardamos ni transmitimos videos
                        <br>
                        • Puedes revocar el permiso en cualquier momento
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <button id="request-camera-btn" style="background: #d4af37; color: #1a1a1a; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin: 10px;">
                            ✅ Permitir Acceso a Cámara
                        </button>
                        <br>
                        <button id="deny-camera-btn" style="background: transparent; color: white; border: 2px solid #666; padding: 12px 25px; border-radius: 25px; font-size: 1rem; cursor: pointer; margin: 10px;">
                            ❌ No Permitir
                        </button>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <h4>💡 Consejos:</h4>
                        <ul style="text-align: left; margin: 10px 0;">
                            <li>Asegúrate de que tu cámara no esté siendo usada por otras apps</li>
                            <li>Si usas Brave, desactiva temporalmente los Shields</li>
                            <li>Verifica que tu navegador esté actualizado</li>
                        </ul>
                    </div>
                    
                    <a href="/test-compatibility.html" style="color: #d4af37; text-decoration: none; font-size: 0.9rem;">
                        🔍 ¿Tienes problemas? Haz el test de compatibilidad
                    </a>
                </div>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('request-camera-btn').addEventListener('click', () => {
            this.requestCameraPermission();
        });
        
        document.getElementById('deny-camera-btn').addEventListener('click', () => {
            this.showCameraDenied();
        });
    }
    
    async requestCameraPermission() {
        const arContainer = document.querySelector('.ar-container');
        
        // Show loading state
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 20px;">⏳</div>
                    <h3>Solicitando Permisos...</h3>
                    <p>Por favor, responde al diálogo de tu navegador.</p>
                    <div style="margin: 20px 0;">
                        <div style="width: 50px; height: 50px; border: 3px solid rgba(212, 175, 55, 0.3); border-top: 3px solid #d4af37; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                    </div>
                </div>
            </div>
        `;
        
        try {
            // Request camera with specific constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'environment' // Prefer rear camera on mobile
                },
                audio: false
            });
            
            console.log('Camera access granted successfully');
            
            // Stop the stream immediately (A-Frame will request it again)
            stream.getTracks().forEach(track => track.stop());
            
            // Show success and start AR
            this.showCameraSuccess();
            
        } catch (error) {
            console.error('Camera permission error:', error);
            this.handleCameraError(error);
        }
    }
    
    showCameraSuccess() {
        const arContainer = document.querySelector('.ar-container');
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div>
                    <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
                    <h3>¡Permisos Otorgados!</h3>
                    <p>Tu cámara está lista para la magia de AfGlam.</p>
                    <div style="margin: 30px 0;">
                        <button onclick="location.reload()" style="background: #d4af37; color: #1a1a1a; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">
                            🚀 Iniciar Experiencia AR
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    showCameraDenied() {
        const arContainer = document.querySelector('.ar-container');
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div style="max-width: 500px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">😔</div>
                    <h3>Permisos de Cámara Denegados</h3>
                    <p style="margin: 20px 0; line-height: 1.6;">
                        Sin acceso a la cámara no podemos mostrar los efectos mágicos de AfGlam.
                        <br><br>
                        Pero no te preocupes, puedes:
                    </p>
                    
                    <div style="margin: 30px 0;">
                        <a href="/demo.html" style="background: #d4af37; color: #1a1a1a; padding: 15px 30px; border-radius: 25px; text-decoration: none; display: inline-block; margin: 10px; font-weight: bold;">
                            📱 Ver Demo del Código QR
                        </a>
                        <br>
                        <button onclick="location.reload()" style="background: transparent; color: white; border: 2px solid #d4af37; padding: 12px 25px; border-radius: 25px; cursor: pointer; margin: 10px;">
                            🔄 Intentar Nuevamente
                        </button>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <h4>🔧 Para habilitar la cámara:</h4>
                        <ol style="text-align: left; margin: 10px 0;">
                            <li>Ve a la configuración de tu navegador</li>
                            <li>Busca "Permisos de sitio" o "Camera"</li>
                            <li>Permite el acceso para localhost:3000</li>
                            <li>Recarga la página</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }
    
    handleCameraError(error) {
        let errorMessage = 'Error desconocido al acceder a la cámara.';
        let solutionMessage = '';
        let showBraveFix = false;
        
        switch (error.name) {
            case 'NotAllowedError':
                errorMessage = 'Acceso a cámara denegado por el usuario.';
                solutionMessage = 'Has bloqueado el acceso a la cámara. Puedes cambiar esto en la configuración de tu navegador.';
                break;
                
            case 'NotFoundError':
                errorMessage = 'No se encontró cámara en tu dispositivo.';
                solutionMessage = 'Asegúrate de tener una cámara conectada y funcionando.';
                break;
                
            case 'NotSupportedError':
                errorMessage = 'Tu navegador no soporta acceso a cámara.';
                solutionMessage = 'Usa Chrome, Safari o Firefox actualizado.';
                break;
                
            case 'NotReadableError':
                errorMessage = 'La cámara está siendo usada por otra aplicación.';
                solutionMessage = 'Cierra otras apps que puedan estar usando la cámara (Zoom, Teams, etc.).';
                break;
                
            case 'OverconstrainedError':
                errorMessage = 'La cámara no cumple con los requisitos.';
                solutionMessage = 'Intenta con una resolución más baja o usa otra cámara.';
                break;
                
            case 'SecurityError':
                errorMessage = 'Error de seguridad al acceder a la cámara.';
                solutionMessage = 'Asegúrate de estar en HTTPS o localhost.';
                showBraveFix = true;
                break;
                
            default:
                errorMessage = `Error: ${error.message}`;
                solutionMessage = 'Intenta recargar la página o usar otro navegador.';
                showBraveFix = true;
        }
        
        const arContainer = document.querySelector('.ar-container');
        let braveFixButton = '';
        
        if (showBraveFix) {
            braveFixButton = `
                <a href="/brave-fix.html" style="background: #ff9800; color: #1a1a1a; padding: 12px 20px; border-radius: 25px; text-decoration: none; display: inline-block; margin: 10px; font-weight: bold;">
                    🔧 Solución para Brave Browser
                </a>
            `;
        }
        
        arContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div style="max-width: 500px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
                    <h3>${errorMessage}</h3>
                    <p style="margin: 20px 0; line-height: 1.6;">${solutionMessage}</p>
                    
                    <div style="margin: 30px 0;">
                        <button onclick="location.reload()" style="background: #d4af37; color: #1a1a1a; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin: 10px;">
                            🔄 Reintentar
                        </button>
                        <br>
                        ${braveFixButton}
                        <a href="/test-compatibility.html" style="background: #2196f3; color: white; padding: 12px 20px; border-radius: 25px; text-decoration: none; display: inline-block; margin: 10px; font-weight: bold;">
                            🔍 Test de Compatibilidad
                        </a>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <h4>💡 Soluciones rápidas:</h4>
                        <ul style="text-align: left; margin: 10px 0;">
                            <li>Recarga la página y permite la cámara</li>
                            <li>Usa Chrome o Safari en lugar de Brave</li>
                            <li>Verifica que no haya otras apps usando la cámara</li>
                            <li>Desactiva extensiones de privacidad</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
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