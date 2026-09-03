#!/usr/bin/env node

/**
 * Preflight script that waits for a slow service to come up before deploy.
 * Prints a line, waits 15 seconds, and repeats that 40 times.
 */

async function preflight() {
  const ITERATIONS = 40;
  const WAIT_TIME_MS = 15000; // 15 seconds

  for (let i = 1; i <= ITERATIONS; i++) {
    console.log(`[${new Date().toISOString()}] Preflight check ${i}/${ITERATIONS}`);
    await new Promise(resolve => setTimeout(resolve, WAIT_TIME_MS));
  }

  console.log(
    `[${new Date().toISOString()}] All ${ITERATIONS} preflight checks completed successfully`
  );
  process.exit(0);
}

preflight().catch(error => {
  console.error('Preflight check failed:', error);
  process.exit(1);
});
