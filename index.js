// import LaunchDarkly from "launchdarkly-node-client-sdk";

// const initialize = (key, user) => LaunchDarkly.initialize(key, user);


// const allFlags = (client) => {
//   client.on("Ready", () => {
//     return client.allFlags()
//   })
// }

// export { initialize, allFlags}
const LaunchDarkly = require("launchdarkly-node-client-sdk");

exports.initialize = function (key, user) {
  return LaunchDarkly.initialize(key, user)
};


exports.allFlags = function (client) {
  client.on("Ready", () => {
    return client.allFlags()
  })
}