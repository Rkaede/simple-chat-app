# Simple Chat App

A clone of the vercel chat template with the following features:

- No authentication
- No chat history stored
- Uses Claude on AWS Bedrock

## Prerequisites

- Node.js 20.x
- AWS Credentials with access to the bedrock models

## Password Protection

Basic password protection is available by setting the `APP_PASSWORD` environment variable. When set, users will be prompted to enter the password before they can access the chat.

## Running Locally

1. Clone the repository
2. Copy the `.env.example` file to `.env.local` and update the environment variables
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### Docker

To run the application locally using Docker:

```bash
docker build -t simple-chat-app .
```

```bash
# replace .env with your own .env file
docker run --name simple-chat-app -p 3000:3000 --env-file .env.local simple-chat-app
```

## Deploying

The simplest way to deploy this app to AWS is either through AWS Amplify or AWS Lightsail.

### AWS Amplify

> [!NOTE]
> AWS Amplify does not support streaming responses form Next.js applications.

1. Fork this repository
2. Create a new project in the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) and connect it to your forked repo.
3. Add the following environment variables to the app in the Amplify Console:

   - `APP_AWS_REGION`: The region hosting the bedrock models (e.g. `us-east-1`)
   - `APP_AWS_ACCESS_KEY_ID`: The AWS access key ID that has access to the bedrock models
   - `APP_AWS_SECRET_ACCESS_KEY`: The AWS secret access key

> [!NOTE]
> We must prefix the environment variables with `APP_` as Amplify reserves this prefix for it's own internal use. This chat app supports environment variables with and without the `APP_` prefix.

4. Add the following to the build settings in the Amplify Console:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        # add this line
        - env | grep -e APP_AWS_REGION -e APP_AWS_ACCESS_KEY_ID -e APP_AWS_SECRET_ACCESS_KEY | sed 's/APP_//1' >> .env.production
    # ...
```

### AWS Lightsail

A docker image is available on Docker Hub at `coreym/simple-chat-app`. To deploy to Lightsail, follow these steps:

1. Go to the [Lightsail console](https://lightsail.aws.amazon.com/ls/webapp/home/containers) and create a new container service.

1. Select the nano capacity.

1. In the "Set up your first deployment" section, select "Specify a custom deployment"

1. Specify any container name you want, and then enter `coreym/simple-chat-app:latest` for the image.

1. Add the following environment variables to the container service:

   - `APP_AWS_REGION`: The region hosting the bedrock models (e.g. `us-east-1`)
   - `APP_AWS_ACCESS_KEY_ID`: The AWS access key ID that has access to the bedrock models
   - `APP_AWS_SECRET_ACCESS_KEY`: The AWS secret access key

1. Under "Open Ports", add 3000 to "HTTP".

1. Deploy!

Please note that this will be publicly accessible. Add security through a reverse proxy if you want to keep it private.
