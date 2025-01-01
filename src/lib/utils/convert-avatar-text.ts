const DEFAULT_AVATAR_TEXT = 'C';

export const convertAvatarText = (text?: string) => {
  if (!text?.trim()) return DEFAULT_AVATAR_TEXT;

  let arr = text.split(' ');

  if (arr.length === 1) return `${arr[0][0]}`.toUpperCase();

  arr = arr.filter(e => e.trim());

  return `${arr[0][0]}${arr[1][0]}`.toUpperCase();
};
