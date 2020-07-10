import hasNotifications from '../compatibility/hasNotifications';
import Storage from '../common/Storage';

const storage = Storage('NOTIFICATIONS');

const { Notification } = global;

const Notifications = function(store, visibility) {
  const requestPermission = async function() {
    // doesn't have notifications
    if (!hasNotifications) return;

    // already granted
    if (Notification.permission === 'granted') return;

    // get permissions
    const permission = await Notification.requestPermission();

    // good-to-go
    if (permission === 'granted') return store.set(true);

    // nope
    store.set(false);
  };

  const setup = function() {
    // not active
    if (!store.get()) return;
    // ensure we can send notifications
    requestPermission();
  };

  store.watch(() => {
    const active = store.get();
    // toggling on
    if (active) requestPermission();
    // save the value
    storage.set(active);
  });

  setup();

  return {
    send(message) {
      // not available
      if (!hasNotifications) return;
      // not turned on
      if (!store.get()) return;
      if (Notification.permission !== 'granted') return;
      // no reason to send notification if we're already focused
      if (visibility.isVisible()) return;

      new Notification(message);
    },
    toggle() {
      store.set(!store.get());
    },
  };
};

Notifications.get = () => !!storage.get();

export default Notifications;