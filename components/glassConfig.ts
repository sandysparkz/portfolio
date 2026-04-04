// Change this value to control blur strength across all glass panels
export const GLASS_BLUR = "20px";

export const GLASS = {
  backdropFilter: `blur(${GLASS_BLUR}) saturate(1.4)`,
  WebkitBackdropFilter: `blur(${GLASS_BLUR}) saturate(1.4)`,
} as const;
