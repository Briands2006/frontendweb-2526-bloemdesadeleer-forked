let MOCK_USERS = [
  {
    id: "user-1",
    email: "test@f1tracker.com",
    password: "Password123!",
    name: "Max Verstappen Fan",
    dateJoined: new Date(2023, 10, 1).toISOString(),
    isAdmin: true,
  },
];

export const findUserByEmail = (email) => {
  return MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const addUser = (email, password, name) => {
  if (findUserByEmail(email)) {
    throw new Error("Gebruiker met dit e-mailadres bestaat al.");
  }

  const newUser = {
    id: `user-${MOCK_USERS.length + 1}`,
    email,
    password,
    name: name || email.split("@")[0],
    dateJoined: new Date().toISOString(),
  };

  MOCK_USERS.push(newUser);
  console.log("Nieuwe gebruiker toegevoegd:", newUser.email);
  return newUser;
};
