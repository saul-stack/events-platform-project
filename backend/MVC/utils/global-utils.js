exports.handleError = (message, error) => {
  console.error(`${message}:`, error);
  throw error;
};

exports.checkForDuplicates = (array) => {
  if (array) {
    const uniqueArrayEntries = new Set(array.flat());
    return uniqueArrayEntries.size !== array.length;
  }
};

exports.extractValues = (obj) => Object.values(obj);

exports.verifyValidEmailAddress = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValidFormat = emailRegex.test(email);
  return isEmailValidFormat;
};
