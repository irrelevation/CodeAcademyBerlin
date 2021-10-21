import { getProgress } from "./utilities.js";

// Achievements
const createAchievement = (achievement) => {
  return {
    ...achievement,
    render(user) {
      const template = document.querySelector("#achievement-card");
      const achievement = template.content.cloneNode(true);
      const icon = achievement.querySelector(".achievement-icon");
      const progressBar = achievement.querySelector(".progress-bar");
      const progress = this.getProgress(user);
      progressBar.style.width = `${progress * 100}%`;
      progressBar.ariaValuenow = progress * 100;
      icon.src = this.imageURL;
      if (progress === 1) icon.classList.add("enabled");
      achievement.querySelector(".card-title").textContent = this.title;
      achievement.querySelector(".card-text").textContent = this.description;
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
    return Math.min(getProgress(user.course) * 2, 1);
  },
});
achievements.push(bergfest);

const farewell = createAchievement({
  title: "Farewell!",
  description: "Finish the course.",
  imageURL: "img/farewell.svg",
  getProgress: (user) => {
    return getProgress(user.course);
  },
});
achievements.push(farewell);

const firstModule = createAchievement({
  title: "First Module",
  description: "Finish your first Module.",
  imageURL: "img/firstModule.svg",
  getProgress: (user) => {},
});

const secondModule = createAchievement({
  title: "First Module",
  description: "Finish your first Module.",
  imageURL: "img/firstModule.svg",
  getProgress: (user) => {
    // TODO
  },
});

const thirdModule = createAchievement({
  title: "First Module",
  description: "Finish your first Module.",
  imageURL: "img/firstModule.svg",
  getProgress: (user) => {
    // TODO
  },
});

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
    return user.githubData.contributionsCollection
      .totalRepositoryContributions > 0
      ? 1
      : 0;
  },
});
achievements.push(firstRepository);

const firstCommit = createAchievement({
  title: "First Commit",
  description: "Make your first Commit.",
  imageURL: "img/commit.svg",
  getProgress: (user) => {
    return user.githubData.contributionsCollection.totalCommitContributions > 0
      ? 1
      : 0;
  },
});
achievements.push(firstCommit);

const firstIssue = createAchievement({
  title: "First Issue",
  description: "Create your first Issue on Github.",
  imageURL: "img/issue.svg",
  getProgress: (user) => {
    return user.githubData.contributionsCollection.totalIssueContributions > 0
      ? 1
      : 0;
  },
});
achievements.push(firstIssue);

const firstFork = createAchievement({
  title: "First Fork",
  description: "Create your first Fork on Github.",
  imageURL: "img/fork.svg",
  getProgress: (user) => {
    // this could be factored out into a utility function
    return user.githubData.forks.nodes.some(
      (fork) => Date.parse(fork.createdAt) > Date.parse(user.course.startDate)
    )
      ? 1
      : 0;
  },
});
achievements.push(firstFork);

const firstPullRequest = createAchievement({
  title: "First Pull Request",
  description: "Create your first Pull Request on Github.",
  imageURL: "img/pull-request.svg",
  getProgress: (user) => {
    return user.githubData.contributionsCollection
      .totalPullRequestContributions > 0
      ? 1
      : 0;
  },
});
achievements.push(firstPullRequest);

const perfectWeek = createAchievement({
  title: "Perfect Week",
  description: "Make a Github contribution on 7 consecutive days.",
  imageURL: "img/perfect-week.svg",
  getProgress: (user) => {
    const days =
      user.githubData.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays
      );
    let counter = 0;
    for (const day of days) {
      if (day.contributionCount > 0) {
        counter++;
        if (counter === 7) return 1;
      } else {
        counter = 0;
      }
    }
    return counter / 7;
  },
});
achievements.push(perfectWeek);

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
  getProgress: (user) => {
    // because github gives u a week starting with sunday, we transform the data
    const weeks =
      user.githubData.contributionsCollection.contributionCalendar.weeks;
    for (let i = 0; i < weeks.length - 2; i++) {
      const saturday =
        weeks[i].contributionDays[weeks[i].contributionDays.length - 1];
      const sunday = weeks[i + 1].contributionDays[0];
      if (saturday.contributionCount === 0 && sunday.contributionCount === 0)
        return 1;
    }
    return 0;
  },
});
achievements.push(getSomeRest);

export { achievements };
