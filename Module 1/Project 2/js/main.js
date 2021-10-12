// Register Bootstrap Tooltips
const githubCalendarDays = document.querySelectorAll(".github-calendar-day");
for (const githubCalendarDay of githubCalendarDays) {
  new bootstrap.Tooltip(githubCalendarDay);
  console.log("got here");
}
