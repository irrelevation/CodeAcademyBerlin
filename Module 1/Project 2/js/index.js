"use strict";
import { course } from "./courses.js";
import { fetchGithubData } from "./query.js";
import { GITHUB_API_KEY as authToken } from "../dev/GITHUB_API_KEY.mjs";

document.querySelector(".course-nickname").textContent = course.nickname;

const createMemberElement = ({ firstName, lastName, avatarUrl }) => {
  const memberElement = document
    .querySelector("#course-member")
    .content.firstElementChild.cloneNode(true);
  memberElement.querySelector("#first-name").textContent = firstName;
  memberElement.querySelector("#last-name").textContent = lastName;
  memberElement.querySelector("#avatar").src = avatarUrl;
  return memberElement;
};

// Add HTML to page
const renderMemberTable = (course) => {
  const memberContainer = document.querySelector("#course-members");
  for (const member of Object.values(course.members)) {
    const memberElement = createMemberElement(member);
    memberContainer.appendChild(memberElement);
    memberElement.addEventListener("click", () => {
      window.location.href += `user.html?githubLogin=${member.githubLogin}`;
    });
  }
};

// TODO find a better name
const updateUser = (userID, entry) => {
  course.members[userID] = {
    ...course.members[userID],
    ...entry,
  };
};

const updateUserWithoutSpread = (userID, entry) => {
  const user = course.members[userID];
  Object.entries(entry).forEach(([key, value]) => {
    user[key] = value;
  });
};

// Get data from Github
// Ugly, needs some refactoring
const buildMultiUserQuery = (users, fields) => {
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
};
const query = buildMultiUserQuery(course.members, ["avatarUrl", "email"]);
fetchGithubData({
  query,
  variables: {},
  authToken,
})
  .then((result) => {
    for (const [userID, entry] of Object.entries(result.data)) {
      updateUser(userID, entry);
    }
    renderMemberTable(course);
  })
  .catch((err) => {
    console.log(err);
  });
