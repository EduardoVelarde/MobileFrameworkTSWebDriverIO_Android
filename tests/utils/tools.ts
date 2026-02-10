import allure from '@wdio/allure-reporter';

const TAG_REGEX = /@([\w-]+)/g;

const SEVERITY_BY_TAG: Record<string, 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial'> = {
  smoke: 'critical',
  regression: 'normal',
  negative: 'minor',
  positive: 'normal',
  cart: 'normal',
};

const FEATURE_BY_TAG: Record<string, string> = {
  login: 'Autenticación',
  cart: 'Carrito',
  smoke: 'Smoke',
};

export const parseTags = (testTitle: string): string[] => {
  const tags = [...testTitle.matchAll(TAG_REGEX)].map(([, tag]) => tag.toLowerCase());
  return [...new Set(tags)];
};

export const attachReadableMetadata = (testTitle: string): void => {
  const tags = parseTags(testTitle);

  for (const tag of tags) {
    allure.addTag(tag);

    const severity = SEVERITY_BY_TAG[tag];
    if (severity) {
      allure.addSeverity(severity);
    }

    const feature = FEATURE_BY_TAG[tag];
    if (feature) {
      allure.addFeature(feature);
    }
  }

  allure.addDescription(`Escenario ejecutado: ${testTitle.replace(TAG_REGEX, '').trim()}`, 'text');
};

export const attachScreenshotToAllure = async (name: string): Promise<void> => {
  const screenshot = await browser.takeScreenshot();
  allure.addAttachment(name, Buffer.from(screenshot, 'base64'), 'image/png');
};

export const runStep = async <T>(name: string, action: () => Promise<T>): Promise<T> => {
  return allure.step<T>(name, async () => action());
};
