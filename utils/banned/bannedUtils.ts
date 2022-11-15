import { TweetV1 } from "twitter-api-v2";
import { v1TwitterClient } from "../../config/config";

export const initializeBanList = async () => {
  
  try{
    const mutedUsersList = (await v1TwitterClient.v1.listMutedUserIds()).ids;
    const banList = new Set(mutedUsersList);
    return banList;
  } catch (error) {
    console.log(error);
    return new Set("");
  }

};

export const checkIfBanned = (tweet: TweetV1, banList: Set<string>) => {
  if(tweet.retweeted_status) {
    return !(banList.has(tweet.user.id_str) || banList.has(tweet.retweeted_status.user.id_str));
  }

  return !banList.has(tweet.user.id_str);
}