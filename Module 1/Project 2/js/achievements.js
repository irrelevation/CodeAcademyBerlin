// Achievements
const createAchievement = ({
  title,
  description,
  imageURL,
  calculateProgress,
}) => {
  return {
    title,
    description,
    imageURL,
    calculateProgress,
    render: function () {
      const template = document.querySelector("#achievement-card");
      const achievement = template.content.cloneNode(true);
      const icon = achievement.querySelector(".achievement-icon");
      const progressBar = achievement.querySelector(".progress-bar");
      const progress = this.calculateProgress();
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
  calculateProgress: () => 1,
});
achievements.push(backToSchool);

export { achievements };
