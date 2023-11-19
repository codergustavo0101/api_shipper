const ProtocolConfig = {
  webProtocol: 'https://',
  webHost: process.env.WEB_HOST,
  mobileProtocol: process.env.MOBILE_PROTOCOL,
  links: {
    splash: 'splash',
    newPassword: 'new-password/:token',
  },
};

export default ProtocolConfig;
