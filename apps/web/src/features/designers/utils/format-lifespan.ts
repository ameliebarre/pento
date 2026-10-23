export function formatLifespan(
  birthDate: string | null | undefined,
  deathDate: string | null | undefined,
) {
  if (!birthDate) return null;
  const born = new Date(birthDate).getFullYear();
  const died = deathDate ? new Date(deathDate).getFullYear() : null;
  return died ? `${born} — ${died}` : `Born ${born}`;
}
