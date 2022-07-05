const {initialize, LDClient} = require("launchdarkly-node-client-sdk");

const key = process.env.LAUNCH_DARKLY_API_KEY;

type ClientType = typeof LDClient

const featureFlagInitialize = (): ClientType => {
  const user = {
    key: "marcia",
    name: "marcia da silva",
    email: "marcia.dasilva@zensurance.com",
  };
  return initialize(key, user);
};

const getFeatureFlagByKey = async (client: ClientType, ffkey:string, fallback = false) => {
  return await client
    .waitForInitialization()
    .then(() => {
      return client.variation(ffkey, fallback);
    })
    .catch((error: any) => {
      console.log(error);
    })
  // client.close();
};

const getFeatureFlagByKeyDetailed = async (client: ClientType, ffkey: string, fallback = false) => {
   return await client
    .waitForInitialization()
    .then(() => {
      return client.variationDetail(ffkey, fallback);
    })
    .catch((error:any) => {
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
};

const getAllFlags = (client:ClientType) => {
  return client.allFlags();
}

module.exports = {getFeatureFlagByKeyDetailed, getAllFlags, featureFlagInitialize, getFeatureFlagByKey}

// react project:
//import featureFlagInitialize from ""
// import getFeatureFlagByKey
const featureFlagClient = featureFlagInitialize();

(async function() {
  const myFlag = getFeatureFlagByKey(featureFlagClient, "show-hello-world");
  const myFlagDetailed = await getFeatureFlagByKeyDetailed(featureFlagClient, "show-hello-world");
  console.log({myFlag, myFlagDetailed});
})()


