interface ApplicationConfigInterface {
  APP_NAME: string;
  APP_URL: string;
  APP_NO_REPLY_EMAIL: string;
}

const applicationConfig: ApplicationConfigInterface = {
  APP_NAME: process.env.APP_NAME || 'App Name',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  APP_NO_REPLY_EMAIL: process.env.APP_NO_REPLY_EMAIL || 'no-reply@localhost',
};

export default applicationConfig;
