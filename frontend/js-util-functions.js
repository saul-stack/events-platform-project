const formatTimeForFrontend = (time) => {
  const hours = time.slice(0, 2);
  const minutes = time.slice(3, 5);
  return `${hours}:${minutes}`;
};

const formatDateForFrontend = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateForPostgres = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export { formatDateForFrontend, formatDateForPostgres, formatTimeForFrontend };
