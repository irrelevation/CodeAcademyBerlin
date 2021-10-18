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

const fetchGithubData = ({ githubLogin, authToken, startDate, endDate }) => {
  const endpoint = "https://api.github.com/graphql";
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${authToken}`);
  headers.append("Content-Type", "application/graphql");

  const query = `
    query ($githubLogin: String!, $startDate: DateTime, $endDate: DateTime) {
      user(login: $githubLogin) {
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
  const variables = { githubLogin, startDate, endDate };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
    redirect: "follow",
  };

  return fetch(endpoint, requestOptions).then((res) => res.json());
};

const createGithubCalendar = (contributionCalendar) => {
  const contributions = document.querySelector("#contributions");
  contributions.appendChild(
    document.createTextNode(contributionCalendar.totalContributions)
  );

  const legend = document.querySelector("#legend");
  legend.appendChild(document.createTextNode("Less"));
  for (const color of contributionCalendar.colors) {
    const indicator = document.createElement("span");
    indicator.style.backgroundColor = color;
    indicator.classList.add("indicator");
    legend.appendChild(indicator);
  }
  legend.appendChild(document.createTextNode("More"));

  const githubCalendar = document.querySelector(".github-calendar");
  for (const week of contributionCalendar.weeks) {
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

// Achievements Card
import { achievements } from "./achievements.js";
const renderAchievements = (user) => {
  const achievementsContainer = document.querySelector(
    "#achievements-container"
  );
  for (const achievement of achievements) {
    achievementsContainer.appendChild(achievement.render(user));
  }
};

// Main

// this should be a class
// const course = {
//   title: "Web Developement",
//   startDate: "2021-09-01T00:00:00+0000",
//   endDate: "2022-03-01T00:00:00+0000",
//   // projects:
//   getProgress: function () {
//     const duration = Date.parse(this.endDate) - Date.parse(this.startDate);
//     const elapsed = Date.now() - Date.parse(this.startDate);
//     return elapsed / duration;
//   },
// };
import { course } from "./courses.js";
console.log(course);

const user = {
  githubLogin: new URL(document.location).searchParams.get("githubLogin"),
  course,
};

fetchGithubData({
  githubLogin: user.githubLogin,
  authToken: GITHUB_API_KEY,
  startDate: user.course.startDate,
  endDate: user.course.endDate,
})
  .then((result) => {
    user.githubData = result.data.user;
    createUserCard(user.githubData);
    createGithubCalendar(
      user.githubData.contributionsCollection.contributionCalendar
    );
    renderAchievements(user);
  })
  .catch((error) => console.log("error", error));
