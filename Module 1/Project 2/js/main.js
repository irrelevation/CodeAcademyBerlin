import { GITHUB_API_KEY } from "../dev/GITHUB_API_KEY.mjs";

// User Card
const createUserCard = ({ avatarUrl, name, email }) => {
  document.querySelector("#avatar").src = avatarUrl;
  document.querySelector("#name").innerText = name;
  document.querySelector("#email").innerText = email;
};

// Daily Goals Card
const dailyGoalsProgressBar = document.querySelector(".progress-bar__progress");
const dailyGoalsPercentage = 0.8;
const circumference = 2 * 3.15 * 15;
const strokeDashOffset = circumference - dailyGoalsPercentage * circumference;
dailyGoalsProgressBar.style.strokeDashoffset = strokeDashOffset;

const fetchGithubData = ({ username, authToken, startDate, endDate }) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/graphql");

  const query = `
    query ($username: String!, $startDate: DateTime, $endDate: DateTime) {
      user(login: $username) {
        name
        avatarUrl
        email
        twitterUsername
        url
        contributionsCollection(from: $startDate, to: $endDate) {
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
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoriesWithContributedCommits
          totalRepositoriesWithContributedIssues
          totalRepositoriesWithContributedPullRequestReviews
          totalRepositoriesWithContributedPullRequests
          totalRepositoryContributions
        }
      }
    }
  `;
  const variables = { username, startDate, endDate };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
    redirect: "follow",
  };

  return fetch(endpoint, requestOptions).then((res) => res.json());
};

const createGithubCalendar = (githubData) => {
  const contributions = document.querySelector("#contributions");
  contributions.appendChild(
    document.createTextNode(
      githubData.user.contributionsCollection.contributionCalendar
        .totalContributions
    )
  );

  const legend = document.querySelector("#legend");
  legend.appendChild(document.createTextNode("Less"));
  for (const color of githubData.user.contributionsCollection
    .contributionCalendar.colors) {
    const indicator = document.createElement("span");
    indicator.style.backgroundColor = color;
    indicator.classList.add("indicator");
    legend.appendChild(indicator);
  }
  legend.appendChild(document.createTextNode("More"));

  const githubCalendar = document.querySelector(".github-calendar");
  for (const week of githubData.user.contributionsCollection
    .contributionCalendar.weeks) {
    for (const weekday of week.contributionDays) {
      const day = document.createElement("div");
      day.style.gridRowStart = weekday.weekday;
      day.dataset.bsToggle = "tooltip";
      day.dataset.bsPlacement = "top";
      day.title = `${weekday.contributionCount} contribution${
        weekday.contributionCount === 1 ? "" : "s"
      } on ${new Date(weekday.date).toDateString()}`;
      day.style.backgroundColor = weekday.color;
      githubCalendar.appendChild(day);
      const tooltip = new bootstrap.Tooltip(day);
    }
  }
};

fetchGithubData({
  username: "irrelevation",
  authToken: GITHUB_API_KEY,
  startDate: "2021-09-01T00:00:00+0000",
  endDate: "2022-03-01T00:00:00+0000",
})
  .then((result) => {
    createUserCard(result.data.user);
    createGithubCalendar(result.data);
  })
  .catch((error) => console.log("error", error));

// Achievements
import { achievements } from "./achievements.js";
const achievementsContainer = document.querySelector("#achievements-container");
for (const achievement of achievements) {
  achievementsContainer.appendChild(achievement.render());
}
