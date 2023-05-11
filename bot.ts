import { ETwitterStreamEvent } from "twitter-api-v2";
import { v1TwitterClient, v2TwitterClient } from "./config/config";
import { initializeBanList, checkIfPermitted } from "./utils/banned/bannedUtils";
import http from "http";

const initializeBot = async () => {
  //Health Check for Digital Ocean
  http.createServer((req, res) => {
    const data = {"status": "ok"};
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
  });

  let banList = await initializeBanList();

  // Get and delete old rules if needed
  const rules = await v2TwitterClient.v2.streamRules();
  if (rules.data?.length) await v2TwitterClient.v2.updateStreamRules({
      delete: { ids: rules.data.map(rule => rule.id) },
    });

  // Add our rules
  await v2TwitterClient.v2.updateStreamRules({
    add: [{ value: "#TechIsHiring" }],
  });

  const stream = await v2TwitterClient.v2.searchStream({
    'tweet.fields': ['referenced_tweets', 'author_id'],
    expansions: ['referenced_tweets.id'],
  });

  // Enable auto reconnect
  stream.autoReconnect = true;
  
  stream.on(ETwitterStreamEvent.Data, async tweet => {
    console.log(tweet);

    const notBanned = checkIfPermitted(tweet.data.author_id, banList) &&
                          tweet.includes?.users ?
                            tweet.includes?.users?.every(user => checkIfPermitted(user.id, banList)) :
                          true;
    const permitted = notBanned && tweet.data.text.toLowerCase().includes("#techishiring");

    if(permitted){
      try {
        await v1TwitterClient.v1.post("favorites/create.json", { id: tweet.data.id });
        await v1TwitterClient.v1.post(`statuses/retweet/${tweet.data.id}.json`);
        return;
      } catch (error) {
        return console.log(error);
      }
    }

    console.log(`This tweet was not a permitted tweet: ${tweet.data.id}`);
  });

  setInterval(async () => {
    const updatedBanList = await initializeBanList();

    const isUpdated = !updatedBanList.has("");
    if(isUpdated) banList = updatedBanList;
  }, 1800000);

};

initializeBot();