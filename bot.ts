import { ETwitterStreamEvent } from "twitter-api-v2";
import twitterClient from "./config/config";
import { initializeBanList, checkIfBanned } from "./utils/banned/bannedUtils";

const TECHISHIRINGTWITTERID = "1392543731866390531"

const initializeBot = async () => {

  let banList = await initializeBanList();

  const stream = await twitterClient.v1.filterStream({
    track: "#TechIsHiring",
    autoConnect: true
  });

  stream.on(ETwitterStreamEvent.Data, async (tweet) => {
    
    console.log(tweet);

    let notTechIsHiringRetweet;

    if(tweet.retweeted) {
      notTechIsHiringRetweet = (tweet.retweeted_status?.user.id_str !== TECHISHIRINGTWITTERID) || (tweet.user.id_str !== TECHISHIRINGTWITTERID);
    } else {
      notTechIsHiringRetweet = tweet.user.id_str !== TECHISHIRINGTWITTERID;
    }

    const notBanned = await checkIfBanned(tweet, banList);
    const permittedTweet = notBanned && notTechIsHiringRetweet;

    if(permittedTweet){
      try {
        twitterClient.v1.post("favorites/create.json", { id: tweet.id_str });
        twitterClient.v1.post(`statuses/retweet/${tweet.id_str}.json`);
      } catch (error) {
        console.log(error);
      }
    }
  });

  setInterval(async () => banList = await initializeBanList(), 1800000);

};

initializeBot();