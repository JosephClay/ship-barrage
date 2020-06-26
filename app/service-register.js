const supported = 'serviceWorker' in navigator;

export default async function() {
  if (!supported) return;

  try {
    await navigator.serviceWorker.register('/assets/service-worker.js');
    // registration worked
    console.log('registration succeeded');
  } catch (err) {
    // registration failed
    console.error('registration failed', err);
  }
};