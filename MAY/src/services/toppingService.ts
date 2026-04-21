import axios from "axios";
import { API_BASE_URL } from "../lib/api";

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Topping {
  id: number;
  name: string;
  price: number;
}

export const toppingService = {
  getAll: async (): Promise<Topping[]> => {
    try {
      const response = await publicApi.get<Topping[]>("/toppings");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch toppings: ${error}`);
    }
  },
};

export default toppingService;
