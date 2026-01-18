export async function relaunchAppIfCrashed() {
  try { await driver.getOrientation(); } catch { await driver.launchApp(); }
}
