import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "config.env") });

const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

export default twitterClient;