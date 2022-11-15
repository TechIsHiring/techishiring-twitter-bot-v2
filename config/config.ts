import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: process.env.APP_ENV === "development" ? path.join(__dirname, "config.env") : "/etc/secrets/config.env" });

export const v1TwitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

export const v2TwitterClient = new TwitterApi(process.env.BEARER_TOKEN);