// Register Bootstrap Tooltips
const githubCalendarDays = document.querySelectorAll(".github-calendar-day");
for (const githubCalendarDay of githubCalendarDays) {
  new bootstrap.Tooltip(githubCalendarDay);
}

import { GITHUB_API_KEY } from "../dev/GITHUB_API_KEY.js";

// Github calendar hard coded
// const endpoint = "https://api.github.com/graphql";

// const headers = new Headers();
// headers.append("Authorization", `Bearer ${GITHUB_API_KEY}`);
// headers.append("Content-Type", "application/graphql");

// const query = JSON.stringify({
//   query:
//     "query($username: String!) {\n  user(login: $username) {\n    name\n    contributionsCollection {\n      contributionCalendar {\n        colors\n        totalContributions\n        weeks {\n          contributionDays {\n            color\n            contributionCount\n            date\n            weekday\n          }\n          firstDay\n        }\n      }\n    }\n  }\n}",
//   variables: { username: "irrelevation" },
// });

// const requestOptions = {
//   method: "POST",
//   headers: headers,
//   body: query,
//   redirect: "follow",
// };

// fetch(endpoint, requestOptions)
//   .then((response) => response.json())

// Github Data
const fetchGithubData = (username, authToken) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/graphql");

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }
  `;
  const variables = { username };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
    redirect: "follow",
  };

  return fetch(endpoint, requestOptions).then(res => res.json());
};

fetchGithubData("irrelevation", GITHUB_API_KEY)
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
