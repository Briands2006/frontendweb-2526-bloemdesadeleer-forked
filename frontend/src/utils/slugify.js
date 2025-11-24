const slug = (text) => {
  return text
    .toString()
    .normalize("NFD")             // decompose accented letters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritical marks
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")    // remove remaining non-word characters
    .replace(/[\s_-]+/g, "-")    // replace spaces/underscores with dash
    .replace(/^-+|-+$/g, "");    // remove leading/trailing dashes
};

export {slug};