export const fetchGithubData = ({ query, variables, authToken }) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/graphql");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
    redirect: "follow",
  };

  return fetch(endpoint, requestOptions).then((res) => res.json());
};
