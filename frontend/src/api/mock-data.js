const DRIVERS = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    number: 33,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "NL",
  },
  {
    id: 2,
    name: "Yuki Tsunoda",
    team: "Red Bull Racing",
    number: 22,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "JP",
  },
  {
    id: 3,
    name: "Lewis Hamilton",
    team: "Scuderia Ferrari",
    number: 44,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "GB",
  },
  {
    id: 4,
    name: "Charles Leclerc",
    team: "Scuderia Ferrari",
    number: 16,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "MC",
  },
  {
    id: 5,
    name: "Lando Norris",
    team: "McLaren F1 Team",
    number: 4,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "GB",
  },
  {
    id: 6,
    name: "Oscar Piastri",
    team: "McLaren F1 Team",
    number: 81,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "AU",
  },
  {
    id: 7,
    name: "George Russell",
    team: "Mercedes-AMG Petronas",
    number: 63,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "GB",
  },
  {
    id: 8,
    name: "Kimi Antonelli",
    team: "Mercedes-AMG Petronas",
    number: 12,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "IT",
  },
  {
    id: 9,
    name: "Fernando Alonso",
    team: "Aston Martin Aramco F1",
    number: 14,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "ES",
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin Aramco F1",
    number: 18,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "CA",
  },
  {
    id: 11,
    name: "Pierre Gasly",
    team: "BWT Alpine F1 Team",
    number: 10,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "FR",
  },
  {
    id: 12,
    name: "Franco Colapinto",
    team: "BWT Alpine F1 Team",
    number: 7,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "AR",
  },
  {
    id: 13,
    name: "Alex Albon",
    team: "Williams Racing",
    number: 23,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "TH",
  },
  {
    id: 14,
    name: "Carlos Sainz",
    team: "Williams Racing",
    number: 55,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "ES",
  },
  {
    id: 15,
    name: "Nico Hülkenberg",
    team: "Kick Sauber F1 Team",
    number: 27,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "DE",
  },
  {
    id: 16,
    name: "Gabriel Bortoleto",
    team: "Kick Sauber F1 Team",
    number: 5,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "BR",
  },
  {
    id: 17,
    name: "Oliver Bearman",
    team: "Haas F1 Team",
    number: 77,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "GB",
  },
  {
    id: 18,
    name: "Esteban Ocon",
    team: "Haas F1 Team",
    number: 31,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "FR",
  },
  {
    id: 19,
    name: "Liam Lawson",
    team: "Visa Cash App Racing Bulls",
    number: 30,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "NZ",
  },
  {
    id: 20,
    name: "Isack Hadjar",
    team: "Visa Cash App Racing Bulls",
    number: 6,
    photo:
      "https://thumbs.dreamstime.com/b/vector-placeholder-upload-profile-picture-design-" +
      "minimalistic-features-simple-circular-symbol-representing-352593011.jpg",
    country: "FR",
  },
];

export { DRIVERS };
