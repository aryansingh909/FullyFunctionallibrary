import { SignJWT, jwtVerify } from 'jose';
import { AdminJwtPayload } from './types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'fallback-dev-secret-change-in-production'
);

const COOKIE_NAME = 'srs_admin_token';
const TOKEN_EXPIRY = '7d';

export async function signAdminToken(payload: Omit<AdminJwtPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminJwtPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
