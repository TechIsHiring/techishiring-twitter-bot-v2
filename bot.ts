import { ETwitterStreamEvent } from "twitter-api-v2";
import { v1TwitterClient } from "./config/config";
import { initializeBanList, checkIfBanned } from "./utils/banned/bannedUtils";

const initializeBot = async () => {

  let banList = await initializeBanList();

  const stream = await v1TwitterClient.v1.filterStream({
    track: "#TechIsHiring",
    autoConnect: true
  });

  stream.autoReconnect = true;

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {

    console.log(tweet);

    const notBanned = await checkIfBanned(tweet, banList);

    if(notBanned){
      try {
        await v1TwitterClient.v1.post("favorites/create.json", { id: tweet.id_str });
        await v1TwitterClient.v1.post(`statuses/retweet/${tweet.id_str}.json`);
        return
      } catch (error) {
        return console.log(error);
      }
    }

    console.log(`This tweet was not a permitted tweet: ${tweet.id_str}`);
  });

  setInterval(async () => banList = await initializeBanList(), 1800000);

};

initializeBot();