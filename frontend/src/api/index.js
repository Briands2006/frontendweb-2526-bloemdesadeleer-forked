import axiosRoot from "axios";
import { JWT_TOKEN_KEY } from "../context/auth";
import { mutate } from "swr";

const baseUrl = import.meta.env.VITE_API_URL;
console.log("API Base URL:", baseUrl);

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

function toMySQLDateTime(date) {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().slice(0, 19).replace("T", " ");
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error(
        "401 Unauthorized: Invalid token. Forcing removal of JWT token"
      );

      localStorage.removeItem(JWT_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export async function getAll(url) {
  const { data } = await axios.get(url);
  return data.items || data.drivers || data.news || data;
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
  try {
    const response = await axios.post(url, arg);
    return response.data;
  } catch (err) {
    console.log("🟥 POST Error Response:", err.response?.data);
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

export async function updateAdmin(userId, isAdmin) {
  try {
    const currentUser = await getById(`users/${userId}`);

    await save("users", {
      arg: {
        id: userId,
        name: currentUser.name,
        email: currentUser.email,
        passwordHash: currentUser.passwordHash,
        birthdate: toMySQLDateTime(currentUser.birthdate),
        dateJoined: toMySQLDateTime(currentUser.dateJoined),
        isAdmin,
      },
    });
    mutate("users");
  } catch (e) {
    console.error("Failed to update user status: ", e);
    console.error("Backend error: ", e.response?.data);
    alert("Error");
  }
}
