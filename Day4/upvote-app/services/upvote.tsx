const baseUrl: string =
  "https://6369f482c07d8f936d8f1762.mockapi.io/api/upvotes";

export const fetchUpvotes = async () => {
  const response = await fetch(`${baseUrl}`);
  const Upvotes = await response.json();
  return Upvotes;
};

export async function postUpvote(data: {
  text: string;
  vote: number;
  person: string;
}) {
  const response = await fetch(`${baseUrl}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
export async function updateUpvote(data: { id: number; vote: number }) {
  const response = await fetch(`${baseUrl}/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
