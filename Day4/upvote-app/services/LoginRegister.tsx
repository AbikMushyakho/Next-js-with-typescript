const baseUrl = "https://6369f482c07d8f936d8f1762.mockapi.io/api/";
export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${baseUrl}/person`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
interface credentails {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function login(data: { email: string; password: string }) {
  const fetchedUser = await fetch(`${baseUrl}/person`);
  const users: credentails[] = await fetchedUser.json();

  //  const result = users.some((user)=> user.email === data.email)
  const filtered: credentails[] = users.filter(
    (user) => user.email.toLowerCase() === data.email.toLowerCase()
  );
  if (filtered.length === 0) {
    throw new Error("User not found!");
  } else {
    if (filtered[0].password === data.password) {
      return {
        username: filtered[0].username,
        email: filtered[0].email,
        personId: filtered[0].id,
      };
    }
    throw new Error("Invalid email or password!");
  }
}
