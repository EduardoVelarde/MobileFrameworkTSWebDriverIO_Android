export async function relaunchAppIfCrashed() {
  try { await driver.getOrientation(); } catch { await driver.launchApp(); }
}

type SwipeDirection = 'up' | 'down';

interface SwipeOptions {
  anchorXPercent?: number;
  durationMs?: number;
}

interface SwipeToElementOptions extends SwipeOptions {
  direction?: SwipeDirection;
  pixelsPerSwipe?: number;
  maxSwipes?: number;
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const getAnchorX = (screenWidth: number, anchorXPercent: number): number => {
  return Math.round(clamp(anchorXPercent, 0.1, 0.9) * screenWidth);
};

const getStartYForDirection = (screenHeight: number, direction: SwipeDirection): number => {
  return direction === 'up' ? Math.round(screenHeight * 0.8) : Math.round(screenHeight * 0.2);
};

const getEndY = (startY: number, pixels: number, direction: SwipeDirection, screenHeight: number): number => {
  const rawEndY = direction === 'up' ? startY - pixels : startY + pixels;
  return clamp(Math.round(rawEndY), 1, screenHeight - 1);
};

export async function swipeByPixels(direction: SwipeDirection, pixels: number, options: SwipeOptions = {}): Promise<void> {
  const swipePixels = Math.max(1, Math.round(Math.abs(pixels)));
  const durationMs = options.durationMs ?? 400;
  const anchorXPercent = options.anchorXPercent ?? 0.5;

  const { width, height } = await driver.getWindowSize();
  const startX = getAnchorX(width, anchorXPercent);
  const startY = getStartYForDirection(height, direction);
  const endY = getEndY(startY, swipePixels, direction, height);

  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: durationMs, x: startX, y: endY },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);

  await driver.releaseActions();
}

export async function swipeUpByPixels(pixels: number, options: SwipeOptions = {}): Promise<void> {
  await swipeByPixels('up', pixels, options);
}

export async function swipeDownByPixels(pixels: number, options: SwipeOptions = {}): Promise<void> {
  await swipeByPixels('down', pixels, options);
}

export async function swipeUntilElement(
  element: WebdriverIO.Element,
  options: SwipeToElementOptions = {},
): Promise<void> {
  const direction = options.direction ?? 'up';
  const pixelsPerSwipe = options.pixelsPerSwipe ?? 450;
  const maxSwipes = options.maxSwipes ?? 8;

  for (let attempt = 0; attempt <= maxSwipes; attempt += 1) {
    if (await element.isDisplayed()) {
      return;
    }

    if (attempt === maxSwipes) {
      break;
    }

    await swipeByPixels(direction, pixelsPerSwipe, options);
  }

  throw new Error(
    `No se encontró el elemento después de ${maxSwipes} swipes (${direction}) con ${pixelsPerSwipe}px por swipe.`,
  );
}
