export function getAvatarUrl(avatarId: string | number): string {
  const id = Math.min(8, Math.max(1, parseInt(String(avatarId), 10)));
  return `entities/user/assets/avatars/${id}.png`;
}
