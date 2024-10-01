const axios = require("axios");

exports.pingEndpoint = async (url, name) => {
  const time = new Date().toLocaleTimeString("en-GB", { hour12: false });

  try {
    const response = await axios.get(url);
    console.log(
      `Reloaded ${name || url} @ ${time}: Status Code: (${response.status}).`
    );
  } catch (error) {
    console.error(`Error reloading ${name || url} @ ${time}:`, error.message);
  }
};

};
