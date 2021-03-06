const LaunchDarkly = require("launchdarkly-node-client-sdk");

const key = process.env.LAUNCH_DARKLY_API_KEY;

const featureFlagInitialize = () => {
  const user = {
    key: "marcia",
    name: "marcia da silva",
    email: "marcia.dasilva@zensurance.com",
  };
  return LaunchDarkly.initialize(key, user);
};

const getFeatureFlagByKey = (client, ffkey, fallback = false) => {
  let result = false;
  client
    .waitForInitialization()
    .then(() => {
      result = client.variation(ffkey, fallback);
    })
    .catch((error) => {
      console.log(error);
    })
  client.close();
  return result;
};

const getFeatureFlagByKeyDetailed = async (client, ffkey, fallback = false) => {
  const result = await client
    .waitForInitialization()
    .then(() => {
      return client.variationDetail(ffkey, fallback);
    })
    .catch((error) => {
      console.log(error);
    })
  // client.close();
  // result will return an object with 
  // {
  //    value: value from feat flag or default
  //    variationIndex:  index of the returned value within the flag's list of variations
  //    reason: object describing the main factor that influenced the flag evaluation value
  // }
  // good for debugging and analytics
  return result;
};

const getAllFlags = (client) => {
  return client.allFlags();
}

module.exports = {getFeatureFlagByKeyDetailed, getAllFlags, featureFlagInitialize, getFeatureFlagByKey}

// react project:
//import featureFlagInitialize from ""
// import getFeatureFlagByKey
const featureFlagClient = featureFlagInitialize();

(async function() {
  const myFlag = getFeatureFlagByKey(featureFlagClient, "choice-model");
  const myFlagDetailed = await getFeatureFlagByKeyDetailed(featureFlagClient, "choice-model");
  console.log({myFlag, myFlagDetailed});
})()


