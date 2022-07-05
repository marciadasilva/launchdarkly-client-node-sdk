const { LDClient, initialize } = require("launchdarkly-node-client-sdk");
class LaunchDarklyProviderCli {
  private client: typeof LDClient;
  constructor(sdkKey: string) {
    // Do we pass the user as a param?
    const user = {
      key: "marcia",
      name: "marcia da silva",
      email: "marcia.dasilva@zensurance.com",
    };
    this.client = initialize(sdkKey, user);
  }

  // do we initialize in every function?
  async getFeatureFlagByKey(ffkey: string, fallback = true) {
    return await this.client
      .waitForInitialization()
      .then(() => {
        return this.client.variation(ffkey, fallback);
      })
      .catch((error: any) => {
        console.log(error);
      });
    // this.client.close();
  }

  // call waitForInitialization in every function?
  // do we close in every function?
  async getFeatureFlagByKeyDetailed(ffkey: string, fallback = true) {
    return await this.client
      .waitForInitialization()
      .then(() => {
        return this.client.variationDetail(ffkey, fallback);
      })
      .catch((error: any) => {
        console.log(error);
      });
    // client.close();
    // result will return an object with
    // {
    //    value: value from feat flag or default
    //    variationIndex:  index of the returned value within the flag's list of variations
    //    reason: object describing the main factor that influenced the flag evaluation value
    // }
    // good for debugging and analytics
  }

  // getAllFlags(client:ClientType){
  //   return client.allFlags();
  // }
}

export { LaunchDarklyProviderCli };
