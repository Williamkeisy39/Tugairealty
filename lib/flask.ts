export const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

export function getAdminHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'x-admin-token': token
  };
}
