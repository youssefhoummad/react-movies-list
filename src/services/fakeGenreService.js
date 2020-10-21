export const genres = [
  { _id: "wiCauuUngGBlmeUUPEhe", name: "Action" },
  { _id: "RbCZbNEAhd6Vbo2sg8Tw", name: "Comedy" },
  { _id: "lZHXduyQHhuaq48OQlBd", name: "Thriller" },
  { _id: "GK4U0DeUrv3UBQu6p2jm", name: "Romance" }
];

function getGenres() {
  return genres.filter((g) => g);
}

export default getGenres;
