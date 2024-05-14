import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  params: {
    ts: 1,
    apikey: process.env.EXPO_PUBLIC_API_KEY,
    hash: process.env.EXPO_PUBLIC_API_HASH,
    limit: 10,
  },
});
