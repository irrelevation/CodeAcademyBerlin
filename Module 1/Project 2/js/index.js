"use strict";
import { course } from "./courses.js";
import { fetchGithubData } from "./query.js";
import { GITHUB_API_KEY as authToken } from "../dev/GITHUB_API_KEY.mjs";

function renderCourseinfo(course) {
  document.querySelector(".course-nickname").textContent = course.nickname;
}

function createMemberElement({ firstName, lastName, avatarUrl }) {
  const memberElement = document
    .querySelector("#course-member")
    .content.firstElementChild.cloneNode(true);
  memberElement.querySelector("#first-name").textContent = firstName;
  memberElement.querySelector("#last-name").textContent = lastName;
  memberElement.querySelector("#avatar").src = avatarUrl;
  return memberElement;
}

// Add HTML to page
function renderMemberTable(course) {
  const memberContainer = document.querySelector("#course-members");
  for (const member of Object.values(course.members)) {
    const memberElement = createMemberElement(member);
    memberContainer.appendChild(memberElement);
    memberElement.addEventListener("click", () => {
      window.location.href += `user.html?githubLogin=${member.githubLogin}`;
    });
  }
}

// TODO find a better name
function updateUser(userID, entry) {
  course.members[userID] = {
    ...course.members[userID],
    ...entry,
  };
}

// Get data from Github
// Ugly, might need some refactoring
function buildMultiUserQuery(users, fields) {
  const userString = Object.values(users).reduce((current, next) => {
    return `
    ${current}
    ${next.githubLogin}: user(login: "${next.githubLogin}") {
      ...UserFragment
    }`;
  }, "");

  return `
  query {
    ${userString}
  }
  
  fragment UserFragment on User {
    ${fields.join("\n")}
  }`;
}

const query = buildMultiUserQuery(course.members, ["avatarUrl", "email"]);
fetchGithubData({
  authToken,
  query,
})
  .then((result) => {
    for (const [userID, entry] of Object.entries(result.data)) {
      updateUser(userID, entry);
    }
    renderCourseinfo(course);
    renderMemberTable(course);
  })
  .catch((err) => {
    console.log(err);
  });
