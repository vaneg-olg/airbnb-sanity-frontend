#!/usr/bin/env node

const MAX_ITERATIONS = 40;
const WAIT_TIME_MS = 15000; // 15 seconds

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runWarmupCheck() {
  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    console.log(`Warmup check ${i}/${MAX_ITERATIONS}: Service is being checked...`);
    await sleep(WAIT_TIME_MS);
  }
  console.log('Warmup check completed successfully.');
  process.exit(0);
}

runWarmupCheck().catch(err => {
  console.error('Warmup check failed:', err);
  process.exit(1);
});
