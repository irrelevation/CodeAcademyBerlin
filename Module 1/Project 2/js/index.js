"use strict";
import { course } from "./courses.js";
const userURL = "";

document.querySelector(".course-nickname").textContent = course.nickname;

const renderMember = ({ firstName, lastName }) => {
  const member = document
    .querySelector("#course-member")
    .content.cloneNode(true);
  member.querySelector("#first-name").textContent = firstName;
  member.querySelector("#last-name").textContent = lastName;

  return member;
};

// Get data from Github
// import { getGithubData } from "./query.js";
// ${member.githubUsername}: user(login: "${member.githubUsername}") {
//   ...UserFragment
// }`
// const query = `
// query {
//   user1: user(login: "aisalmi") {
//     ...UserFragment
//   }
//   user2: user(login: "bertrandmartel") {
//     ...UserFragment
//   }
//   user3: user(login: "molokoloco") {
//     ...UserFragment
//   }
// }

// fragment UserFragment on User {
//   avatarUrl
// }`
// const githubData

// Add HTML to page
const memberContainer = document.querySelector("#course-members");
for (const member of course.members) {
  const memberElement = renderMember(member);
  memberContainer.appendChild(memberElement);
  memberElement.addEventListener("click", () => {
    console.log(window.location);
    window.location += `user.html?githubLogin=${member.githubLogin}`;
  });
}

document.querySelector("#btn").addEventListener("click", () => {
  console.log(window.location);
  window.location += `user.html?githubLogin=irrelevation`;
});
