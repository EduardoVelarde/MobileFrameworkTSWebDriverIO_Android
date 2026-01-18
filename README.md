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
