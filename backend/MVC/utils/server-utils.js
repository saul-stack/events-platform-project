const axios = require("axios");

exports.pingEndpoint = async (url) => {
  try {
    const response = await axios.get(url);
    console.log(
      `Reloaded ${url} @ ${new Date().toISOString()}: Status Code ${
        response.status
      }.`
    );
  } catch {
    console.error(`Error reloading ${url} @ ${new Date().toISOString()}:`);
  }
};
