import { lyricsAPI } from "@/constants/constants";
import axios from "axios";

const api = axios.create({
  baseURL: lyricsAPI,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
