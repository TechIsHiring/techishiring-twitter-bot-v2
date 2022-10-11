import { ETwitterStreamEvent } from "twitter-api-v2";
import twitterClient from "./config/config";

const initializeBot = async () => {
  
  const stream = await twitterClient.v1.filterStream({
    track: "#TestIsHiring",
    autoConnect: true
  });

  stream.on(ETwitterStreamEvent.Data, (tweet) => {
    console.log(tweet);
  })

};

initializeBot();