export const course = {
  topic: "Web Developement",
  nickname: "Green Wombats",
  startDate: "2021-09-13T00:00:00+0000",
  endDate: "2022-03-01T00:00:00+0000",
  members: [
    { firstName: "Anan", lastName: "Tan", githubLogin: "anantancoding" },
    { firstName: "Lukas", lastName: "Zöllner", githubLogin: "irrelevation" },
    { firstName: "Annika", lastName: "Geffers", githubLogin: "BibiHuebner" },
    { firstName: "Stephan", lastName: "Lüddemann", githubLogin: "focuscookie" },
    { firstName: "Andreas", lastName: "Müller", githubLogin: "aeonyuonmiller" },
  ],
  modules: [
    {
      name: "Front-End Development",
      startDate: "2021-09-13T00:00:00+0000",
      endDate: "2021-12-13T00:00:00+0000",
      projects: [
        {
          name: "HTML & CSS",
          startDate: "2021-09-13T00:00:00+0000",
          endDate: "2021-09-22T00:00:00+0000",
        },
        {
          name: "JavaScript",
          startDate: "2021-09-22T00:00:00+0000",
          endDate: "2021-10-20T00:00:00+0000",
        },
        {
          name: "JavaScript Framework",
          startDate: "2021-10-20T00:00:00+0000",
          endDate: "2021-12-13T00:00:00+0000",
        },
      ],
    },
    {
      name: "Full-Stack Development",
      startDate: "2021-12-13T00:00:00+0000",
      endDate: "2022-01-13T00:00:00+0000",
      projects: [
        {
          name: "MERN Stack",
          startDate: "2021-12-13T00:00:00+0000",
          endDate: "2022-01-13T00:00:00+0000",
        },
      ],
    },
    {
      name: "Front-End Development",
      startDate: "2022-01-13T00:00:00+0000",
      endDate: "2022-02-13T00:00:00+0000",
      projects: [
        {
          name: "TypeScript & GraphQL",
          startDate: "2022-01-13T00:00:00+0000",
          endDate: "2022-02-13T00:00:00+0000",
        },
      ],
    },
  ],
  // This could get refactored into
  //
  // a) a method:
  // getProgress: function () {
  //   const duration = Date.parse(this.endDate) - Date.parse(this.startDate);
  //   const elapsed = Date.now() - Date.parse(this.startDate);
  //   return Math.min(elapsed / duration, 1);
  // }
  //
  // b) a function:
  // getProgress: function (dateRange) {
  //   const duration = Date.parse(dateRange.endDate) - Date.parse(dateRange.startDate);
  //   const elapsed = Date.now() - Date.parse(dateRange.startDate);
  //   return Math.min(elapsed / duration, 1);
  // }

  getProgress: function () {
    const duration = Date.parse(this.endDate) - Date.parse(this.startDate);
    const elapsed = Date.now() - Date.parse(this.startDate);
    return Math.min(elapsed / duration, 1);
  },
};
