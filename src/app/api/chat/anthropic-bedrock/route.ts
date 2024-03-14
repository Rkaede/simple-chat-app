import { AnthropicStream, StreamingTextResponse } from 'ai';
import { AnthropicBedrock } from '@anthropic-ai/bedrock-sdk';

const anthropic = new AnthropicBedrock({
  awsRegion: process.env._AWS_REGION,
  awsAccessKey: process.env._AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env._AWS_SECRET_ACCESS_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await anthropic.messages.create({
    messages,
    model: 'anthropic.claude-3-sonnet-20240229-v1:0',
    stream: true,
    max_tokens: 1024,
  });

  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}
