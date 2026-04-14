/**
 * Prefix a public-asset path with the site's basePath so images work
 * both in dev (no prefix) and in the GitHub Pages deploy (/portfolio).
 *
 * Use for any <Image src={...}> that comes from a string in data files
 * (certData, projectData, blogData), because next/image does not auto
 * prefix string src values under static export.
 *
 * Usage: <Image src={asset(cert.badge)} ... />
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
