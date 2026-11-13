import type { Actor } from '@energywebfoundation/generic-green-proofs-api';
import type { AuthTokenClaim } from '@energywebfoundation/generic-green-proofs-auth';
import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const IntelligentAuthTokenClaim: AuthTokenClaim<boolean> = {
  name: 'intelligent',
  updateValue: ({ value }) => value,
};

declare module 'http' {
  interface IncomingMessage {
    actor: Actor;
  }
}

@Injectable()
export class IntelligentAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();

    return request.raw.actor.getAuthToken().getClaim(IntelligentAuthTokenClaim) === true;
  }
}
