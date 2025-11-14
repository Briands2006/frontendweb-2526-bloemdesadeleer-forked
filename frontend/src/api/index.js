import axiosRoot from "axios";
import { JWT_TOKEN_KEY } from "../context/auth";

const baseUrl = import.meta.env.VITE_API_URL;
console.log("API Base URL:", baseUrl);

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export async function getAll(url) {
  const { data } = await axios.get(url);
  return data.items ||data.drivers || data.news ||data;
}

export async function getById(url) {
  const { data } = await axios.get(url);
  return data;
}

export async function getBySlug(url, slug) {
  const { data } = await axios.get(`${url}/n/${slug}`);
  return data;
}

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
};

export const post = async (url, { arg }) => {
  console.log("🟦 POST Request URL:", url);
  console.log("🟦 POST Request Body:", arg);

  try {
    const response = await axios.post(url, arg);
    console.log("🟩 POST Response:", response.data);
    return response.data;
  } catch (err) {
    console.log("🟥 POST Error Response:", err.response?.data);
    console.log("🟥 POST Error Status:", err.response?.status);
    throw err;
  }
};

export async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? "PUT" : "POST",
    url: `${url}/${id ?? ""}`,
    data,
  });
}
