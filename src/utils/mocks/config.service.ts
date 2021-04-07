export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
        return '3600';
      case 'JWT_ACCESS_TOKEN_SECRET':
        return 'secret';
      default:
        return '';
    }
  }
}