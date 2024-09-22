const formatTime = (timeStr) => {
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(3, 5);
  return `${hours}:${minutes}`;
};

const formatDateForPostgres = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export { formatDateForPostgres, formatTime };
