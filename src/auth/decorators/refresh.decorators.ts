import { SetMetadata } from '@nestjs/common';

export const RefreshToken = () => {
  return SetMetadata('refreshToken', true);
};
