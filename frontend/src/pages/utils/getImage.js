const baseURL = import.meta.env.VITE_BASE_IMG_URL;
console.log("API Base URL:", baseURL);

export const getAssetUrl = (type, filename) => {

  if (!type || !filename) {
    console.error(
      "Type en bestandsnaam zijn vereist om de asset URL te genereren.",
    );
    return "";
  }

  const normalizedType = type.replace(/^\/+|\/+$/g, "");
  const normalizedFilename = filename.replace(/^\/+/, "");

  return `${baseURL}/${normalizedType}/${normalizedFilename}`;
};
