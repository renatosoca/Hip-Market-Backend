export const isValidRole = (role: string) => {
  const allowedRoles = ['admin', 'client'];
  if (!allowedRoles.includes(role)) return false;

  return true;
}