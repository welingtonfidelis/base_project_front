export const storage = () => {
  const get = (key: string) => {
    const value = localStorage.getItem(key);

    if (value) return JSON.parse(value);

    return "";
  };

  const set = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  }

  return { get, set, remove };
};
