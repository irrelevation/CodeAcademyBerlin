const getProgress = (dateRange) => {
  const start = Date.parse(dateRange.startDate);
  const duration = Date.parse(dateRange.endDate) - start;
  const elapsed = Date.now() - start;
  return Math.min(elapsed / duration, 1);
};
export { getProgress };