// browser.ts
import { setupWorker } from 'msw/browser';

import { getHandlers } from './handlers';

export async function initWorker() {
  const handlers = await getHandlers();
  return setupWorker(...handlers);
}
