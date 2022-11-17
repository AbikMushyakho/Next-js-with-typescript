const baseUrl: string =
  "https://636b387dc07d8f936db0905c.mockapi.io/api/upvotes";

export const fetchUpvotes = async () => {
  const response = await fetch(`${baseUrl}`);
  const Upvotes = await response.json();
  return Upvotes;
};

// export const postUpvotes = async (data: { text: string; vote: number }) => {
//   console.log(data);
//   const response = await fetch(`{${baseUrl}}`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return response.json();
// };

export async function postUpvote(data: { text: string; vote: number }) {
  const response = await fetch(
    `https://636b387dc07d8f936db0905c.mockapi.io/api/upvotes`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}
export async function updateUpvote(data: { id: number; vote: number }) {
  const response = await fetch(
    `https://636b387dc07d8f936db0905c.mockapi.io/api/upvotes/${data.id}`,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}
