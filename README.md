## Prerrequisitos
- Node 18+, Java 11+
- Android SDK + emulator o dispositivo (ADB conectado)
- Appium 2.x (`npm i -g appium`) y driver `uiautomator2` (`appium driver install uiautomator2`)

## Instalación
npm i
npm run setup:appium

## Configurar capacidades
# Opción A: APK local
export ANDROID_APP_PATH=/abs/path/app.apk

# Opción B: App ya instalada
export APP_PACKAGE=com.example.app
export APP_ACTIVITY=.MainActivity

# Variables útiles
export ANDROID_DEVICE='Pixel_7_Pro_API_34'
export ANDROID_VERSION='14'
export RESET_APP=true
export TEST_USER='user@example.com'
export TEST_PASS='Secret123'

## Ejecutar
npm run test:android     # todas las specs
npm run test:smoke       # solo suite smoke

## Reportes Allure
npm run report:allure

### Screenshots y legibilidad del reporte
- El framework adjunta screenshot automático en Allure cuando una prueba falla.
- Si quieres screenshot también en pruebas exitosas, habilita:

```bash
export SCREENSHOT_ON_PASS=true
```

- Para tener reportes más legibles, usa tags dentro del nombre del test (ej: `@smoke @negative @cart`).
  El framework transforma esos tags en metadatos de Allure (tags, severity y feature).


## Gestos reutilizables (swipe)
En `tests/utils/device.ts` tienes helpers para swipe vertical con control de pixeles:

- `swipeUpByPixels(pixels, options)`
- `swipeDownByPixels(pixels, options)`
- `swipeByPixels(direction, pixels, options)`
- `swipeUntilElement(element, { direction, pixelsPerSwipe, maxSwipes, anchorXPercent, durationMs })`

Ejemplo:

```ts
import { swipeUntilElement, swipeUpByPixels } from '../utils/device';

await swipeUpByPixels(300);
await swipeUntilElement($('~mi elemento objetivo'), {
  direction: 'up',
  pixelsPerSwipe: 250,
  maxSwipes: 10,
});
```
