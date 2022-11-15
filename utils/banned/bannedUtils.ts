import { TweetV2SingleStreamResult } from "twitter-api-v2";
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

export const checkIfBanned = (tweet: TweetV2SingleStreamResult, banList: Set<string>) => {
  return !banList.has(tweet.data.author_id as string);
}