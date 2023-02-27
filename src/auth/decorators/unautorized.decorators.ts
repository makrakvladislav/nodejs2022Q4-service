import { SetMetadata } from '@nestjs/common';

export const UnauthorizedRequest = () => {
  return SetMetadata('allowUnauthorizedRequest', true);
};
