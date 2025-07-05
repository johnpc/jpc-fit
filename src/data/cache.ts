export const HAS_PERMISSION_KEY = "hasPermission";
export const EVERYTHING_KEY = "everything";
export const EVERYTHING_LOCK_KEY = "everything_lock";

const usedKeys: string[] = [];
export const setCache = (key: string, value: string) => {
  usedKeys.includes(key) || usedKeys.push(key);

  localStorage.setItem(key, value);
};

export const getCache = (key: string) => {
  return localStorage.getItem(key);
};

export const clearCache = () => {
  console.log("Clearing cache", { usedKeys });
  usedKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};
