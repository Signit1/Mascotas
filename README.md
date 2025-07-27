# AfGlam - Moda mágica para almas peludas 🦋✨

Una experiencia WebAR elegante que permite a los dueños de mascotas ver a sus compañeros peludos con alas de mariposa, de ángel y otros efectos mágicos en tiempo real.

## 🎯 Características

- **Experiencia WebAR completa** - Funciona directamente en el navegador móvil sin necesidad de instalar apps
- **Código QR personalizado** - Cada prenda incluye un QR único que lleva a la experiencia
- **Efectos mágicos animados** - Alas de mariposa, alas de ángel y efectos de brillo
- **Captura de fotos** - Toma fotos de tu mascota con efectos AR
- **Compartir en redes sociales** - Comparte las fotos mágicas directamente
- **Diseño elegante** - Interfaz glamorosa con colores negro, blanco y dorado
- **Responsive** - Optimizado para todos los dispositivos móviles

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd afglam-webar
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador**
   - Ve a `http://localhost:3000`
   - Para probar AR, usa un dispositivo móvil o emula uno en las herramientas de desarrollador

## 📱 Uso

### Para usuarios finales

1. **Escanea el código QR** en la prenda de tu mascota
2. **Permite acceso a la cámara** cuando se solicite
3. **Apunta hacia tu mascota** para activar los efectos AR
4. **Cambia entre efectos** usando los botones en la parte inferior
5. **Toma una foto** con el botón de cámara
6. **Comparte** tu creación mágica

### Para desarrolladores

#### Estructura del proyecto

```
afglam-webar/
├── index.html              # Página principal
├── styles/
│   └── main.css           # Estilos principales
├── js/
│   ├── main.js            # Lógica principal de la app
│   └── ar-experience.js   # Experiencia AR específica
├── public/
│   └── assets/            # Assets estáticos
├── package.json
├── vite.config.js
└── README.md
```

#### Comandos disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza la build
npm run serve    # Sirve la build en puerto 8080
```

## 🎨 Personalización

### Colores de marca

Los colores principales están definidos en CSS variables:

```css
:root {
  --primary-black: #1a1a1a;
  --primary-white: #ffffff;
  --primary-gold: #d4af37;
  --secondary-gold: #f4e4bc;
}
```

### Efectos AR

Los efectos se pueden personalizar en `js/ar-experience.js`:

- **Alas de mariposa**: Colores rosados con animación de aleteo
- **Alas de ángel**: Blancas con resplandor dorado
- **Efectos de brillo**: Partículas multicolores animadas

### Código QR

El código QR se genera automáticamente con el logo de AfGlam en el centro. Para personalizar:

```javascript
// En main.js, método generateQRCode()
QRCode.toCanvas(qrContainer, currentURL, {
  width: 200,
  height: 200,
  color: {
    dark: '#1a1a1a',    // Color del QR
    light: '#ffffff'    // Color de fondo
  }
});
```

## 🔧 Tecnologías utilizadas

- **A-Frame** - Framework WebVR/WebAR
- **MindAR** - Librería de realidad aumentada
- **Vite** - Build tool y servidor de desarrollo
- **QRCode.js** - Generación de códigos QR
- **Three.js** - Renderizado 3D (incluido en A-Frame)

## 📋 Roadmap

### MVP (Actual)
- ✅ Experiencia WebAR básica
- ✅ Código QR funcional
- ✅ Efectos de alas y brillo
- ✅ Captura de fotos
- ✅ Diseño responsive

### Próximas características
- [ ] Más efectos mágicos (coronas, capas, etc.)
- [ ] Filtros de foto adicionales
- [ ] Galería de fotos guardadas
- [ ] Integración con redes sociales
- [ ] Analytics y métricas de uso
- [ ] PWA (Progressive Web App)
- [ ] Soporte offline

## 🌐 Despliegue

### Para producción

1. **Construye el proyecto**
   ```bash
   npm run build
   ```

2. **Sube los archivos** de la carpeta `dist/` a tu servidor web

3. **Configura HTTPS** - Requerido para WebAR en producción

### Servicios recomendados

- **Netlify** - Despliegue automático desde Git
- **Vercel** - Despliegue rápido y optimizado
- **Firebase Hosting** - Hosting de Google con CDN global

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:

- **Email**: soporte@afglam.com
- **Documentación**: [docs.afglam.com](https://docs.afglam.com)
- **Issues**: [GitHub Issues](https://github.com/afglam/webar/issues)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**AfGlam** - Haciendo la moda de mascotas más mágica ✨ 