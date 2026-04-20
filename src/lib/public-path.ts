const prefix =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

/** Public folder URL; prefix matches `basePath` for GitHub Pages static export. */
export function publicPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${normalized}` : normalized;
}
