const formatTime = (timeStr) => {
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(3, 5);
  return `${hours}:${minutes}`;
};

export { formatTime };
