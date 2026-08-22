const { withAndroidManifest, withDangerousMod, AndroidConfig } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const NOTIFICATION_ICON_NAME = 'notification_icon';
const NOTIFICATION_ICON_SOURCE = 'assets/nott.png';

function withNotificationIcon(config) {
  config = withAndroidManifest(config, config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      'com.google.firebase.messaging.default_notification_icon',
      `@drawable/${NOTIFICATION_ICON_NAME}`,
      'resource'
    );

    return config;
  });

  return withDangerousMod(config, [
    'android',
    async config => {
      const source = path.join(config.modRequest.projectRoot, NOTIFICATION_ICON_SOURCE);
      const destinationDirectory = path.join(
        config.modRequest.platformProjectRoot,
        'app',
        'src',
        'main',
        'res',
        'drawable'
      );
      const destination = path.join(
        destinationDirectory,
        `${NOTIFICATION_ICON_NAME}.png`
      );

      if (!fs.existsSync(source)) {
        throw new Error(`Notification icon not found: ${source}`);
      }

      fs.mkdirSync(destinationDirectory, { recursive: true });
      fs.copyFileSync(source, destination);

      return config;
    },
  ]);
}

module.exports = withNotificationIcon;
