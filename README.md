# Simple Chat App

A clone of the vercel chat template with the following features:

- No authentication
- No chat history stored
- Uses Claude on AWS Bedrock

## Prerequisites

- Node.js 20.x
- AWS Credentials with access to the bedrock models

## Running Locally

1. Clone the repository
2. Copy the `.env.example` file to `.env.local` and update the environment variables
3. Install the dependencies:

   ```bash
   # using npm
   npm install

   # using yarn
   yarn install

   # using pnpm
   pnpm install
   ```

4. Start the development server:

   ```bash
   # using npm
   npm run dev

   # using yarn
   yarn dev

   # using pnpm
   pnpm dev
   ```

## Deploying

## AWS Amplify

1. Fork this repository
2. Create a new project in the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) and connect it to your forked repo.
3. Add the following environment variables to the app in the Amplify Console:

   - `APP_AWS_REGION`: The region hosting the bedrock models (e.g. `us-east-1`)
   - `APP_AWS_ACCESS_KEY_ID`: The AWS access key ID that has access to the bedrock models
   - `APP_AWS_SECRET_ACCESS_KEY`: The AWS secret access key

> [!NOTE]
> We must prefix the environment variables with `APP_` as Amplify reserves this prefix for it's own internal use. This chat app supports environment variables with and without the `APP_` prefix.
