import axios from "axios";

class Fetch {
  static async get(url: string) {
    return (await axios.get(url)).data;
  }

  static async post(url: string, payload: any) {
    return (await axios.post(url, payload)).data;
  }

  static async put(url: string, payload: any) {
    return (await axios.put(url, payload)).data;
  }

  static async patch(url: string, payload: any) {
    return (await axios.patch(url, payload)).data;
  }

  static async delete(url: string, payload: any) {
    return (await axios.delete(url, payload)).data;
  }
}

export { Fetch };
