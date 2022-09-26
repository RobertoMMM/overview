class LocalStorage {
  static get = (name: string) => {
    return JSON.parse(localStorage.getItem(name) as string);
  };

  static set = <T>(name: string, data: T) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
}

export { LocalStorage };
