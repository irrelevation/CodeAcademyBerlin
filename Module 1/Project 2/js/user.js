"use strict";
import { GITHUB_API_KEY } from "../dev/GITHUB_API_KEY.mjs";
import { calendarOf } from "./utilities.js";

// User Card
function renderOverview({ avatarUrl, name, email }) {
  document.querySelector("#avatar").src = avatarUrl;
  document.querySelector("#name").innerText = name;
  document.querySelector("#email").innerText = email;
}

// Daily Goals Card
updateDailyGoal(80);

function updateDailyGoal(percentage) {
  const dailyGoalsProgressBar = document.querySelector(
    ".progress-bar__progress"
  );
  const circumference = 2 * 3.15 * 15;
  const strokeDashOffset = circumference - (percentage / 100) * circumference;
  dailyGoalsProgressBar.style.strokeDashoffset = strokeDashOffset;
}

// Github Calendar Card
function renderGithubCalendar(contributionCalendar) {
  renderHeader();
  renderGrid();
  renderLegend();

  function renderHeader() {
    const contributions = document.querySelector("#contributions");
    contributions.appendChild(
      document.createTextNode(contributionCalendar.totalContributions)
    );
  }

  function renderGrid() {
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
        new bootstrap.Tooltip(day);
      }
    }
  }

  function renderLegend() {
    const legend = document.querySelector("#legend");
    legend.appendChild(document.createTextNode("Less"));
    for (const color of contributionCalendar.colors) {
      const indicator = document.createElement("span");
      indicator.style.backgroundColor = color;
      indicator.classList.add("indicator");
      legend.appendChild(indicator);
    }
    legend.appendChild(document.createTextNode("More"));
  }
}

// Achievements Card
import { achievements } from "./achievements.js";
function renderAchievements(user) {
  const achievementsContainer = document.querySelector(
    "#achievements-container"
  );
  for (const achievement of achievements) {
    achievementsContainer.appendChild(achievement.render(user));
  }
}

// Main

import { course } from "./courses.js";
import { fetchGithubData } from "./query.js";

const user = {
  githubLogin: new URL(document.location).searchParams.get("githubLogin"),
  course,
};

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
    forks: repositories(last: 1, isFork: true) {
      nodes {
        name
        url
        createdAt
      }
    }
  }
}
`;
const variables = {
  githubLogin: user.githubLogin,
  startDate: user.course.startDate,
  endDate: user.course.endDate,
};

fetchGithubData({
  query,
  variables,
  authToken: GITHUB_API_KEY,
})
  .then((result) => {
    user.githubData = result.data.user;
    console.log(user.githubData);
    renderOverview(user.githubData);
    renderGithubCalendar(calendarOf(user));
    renderAchievements(user);
  })
  .catch((error) => console.log("error", error));
