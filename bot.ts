import { ETwitterStreamEvent } from "twitter-api-v2";
import twitterClient from "./config/config";

const TECHISHIRINGTWITTERID = "1392543731866390531"

const initializeBot = async () => {
  
  const stream = await twitterClient.v1.filterStream({
    track: "#TestIsHiring",
    autoConnect: true
  });

  stream.on(ETwitterStreamEvent.Data, (tweet) => {
    console.log(tweet);

    if(tweet.user.id_str !== TECHISHIRINGTWITTERID){
      twitterClient.v1.post("favorites/create.json", { id: tweet.id_str });
      twitterClient.v1.post(`statuses/retweet/${tweet.id_str}.json`);
    }
  });

};

initializeBot();