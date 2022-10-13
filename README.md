# TechIsHiring Twitter Bot
The Twitter bot that powers the hashtag #TechIsHiring by liking and retweeting any tweet containing the hashtag.

## Technologies Used

<ul>
<li>Node.js</li>
<li>TypeScript</li>
<li>Twitter-api-v2</li>
<li>dotenv</li>
</ul>

## Installing Dependencies

You can install all dependencies for this app by running the command:

    npm ci

## Building the application

As a TypeScript app, you'll need to first build the application before running it. You can build the application by running the command:

    npm run build

## Running the application

You will need to configure Twitter API Keys from a Twitter Developer account to run this app. You will need to create a `config.env` file and update `config.ts` to point to it.

The config.env must contain:

```.env
API_KEY=*Your API Key*
API_SECRET_KEY=*Your API Secret Key*
ACCESS_TOKEN=*Your Access Token*
ACCESS_TOKEN_SECRET=*Your Access Token Secret*
```

Once completed, you can start the app by running the command:

    npm start