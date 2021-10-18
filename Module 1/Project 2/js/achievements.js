// Achievements
const createAchievement = ({ title, description, imageURL, getProgress }) => {
  return {
    title,
    description,
    imageURL,
    getProgress,
    render: function (user) {
      const template = document.querySelector("#achievement-card");
      const achievement = template.content.cloneNode(true);
      const icon = achievement.querySelector(".achievement-icon");
      const progressBar = achievement.querySelector(".progress-bar");
      const progress = this.getProgress(user);
      progressBar.style.width = `${progress * 100}%`;
      progressBar.ariaValuenow = progress * 100;
      icon.src = imageURL;
      if (progress === 1) icon.classList.add("enabled");
      achievement.querySelector(".card-title").textContent = title;
      achievement.querySelector(".card-text").textContent = description;
      return achievement;
    },
  };
};

const achievements = [];
const backToSchool = createAchievement({
  title: "Back To School",
  description: "You got accepted to the course. Welcome!",
  imageURL: "img/back-to-school.svg",
  getProgress: () => 1,
});
achievements.push(backToSchool);

const bergfest = createAchievement({
  title: "Bergfest",
  description: "Finish the first half of the course.",
  imageURL: "img/bergfest.svg",
  getProgress: (user) => {
    return Math.min(user.course.getProgress() * 2, 1);
  },
});
achievements.push(bergfest);

const farewell = createAchievement({
  title: "Farewell!",
  description: "Finish the course.",
  imageURL: "img/farewell.svg",
  getProgress: (user) => {
    return user.course.getProgress();
  },
});
achievements.push(farewell);

const firstProject = createAchievement({
  title: "First Project",
  description: "Finish your first Project.",
  imageURL: "img/firstProject.svg",
  getProgress: (user) => {
    // TODO
  },
});

const secondProject = createAchievement({
  title: "Second Project",
  description: "Finish your second Project.",
  imageURL: "img/secondProject.svg",
  getProgress: (data) => {
    // TODO
  },
});

const thirdProject = createAchievement({
  title: "Third Project",
  description: "Finish your third Project.",
  imageURL: "img/thirdProject.svg",
  getProgress: (data) => {
    // TODO
  },
});

const fourthProject = createAchievement({
  title: "Fourth Project",
  description: "Finish your fourth Project.",
  imageURL: "img/fourthProject.svg",
  getProgress: (data) => {
    // TODO
  },
});

const firstRepository = createAchievement({
  title: "First Repository",
  description: "Create your first repository on Github.",
  imageURL: "img/repository.svg",
  getProgress: (user) => {
    // TODO
  },
});

const firstCommit = createAchievement({
  title: "First Commit",
  description: "Make your first Commit.",
  imageURL: "img/commit.svg",
  getProgress: (data) => {
    // TODO
  },
});

const firstIssue = createAchievement({
  title: "First Issue",
  description: "Create your first Issue on Github.",
  imageURL: "img/issue.svg",
  getProgress: (data) => {
    // TODO
  },
});

const firstFork = createAchievement({
  title: "First Fork",
  description: "Create your first Fork on Github.",
  imageURL: "img/fork.svg",
  getProgress: (data) => {
    // TODO
    // user.repositories.some((repository) => repository.isFork === true)
  },
});

const firstPullRequest = createAchievement({
  title: "First Pull Request",
  description: "Create your first Pull Request on Github.",
  imageURL: "img/pull-request.svg",
  getProgress: (data) => {
    // TODO
  },
});

const perfectWeek = createAchievement({
  title: "Perfect Week",
  description: "Make a Github contribution on 7 consecutive days.",
  imageURL: "img/perfekt-week.svg",
  getProgress: (data) => {
    // TODO
  },
});

const goalkeeper = createAchievement({
  title: "Goalkeeper",
  description: "Achieve 100% of your daily goal.",
  imageURL: "img/goalkeeper.svg",
  getProgress: (data) => {
    // TODO
  },
});

const getSomeRest = createAchievement({
  title: "Get Some Rest!",
  description: "Don't contribute anything on Github during a weekend.",
  imageURL: "img/get-some-rest.svg",
  getProgress: (data) => {
    // TODO
  },
});

export { achievements };
