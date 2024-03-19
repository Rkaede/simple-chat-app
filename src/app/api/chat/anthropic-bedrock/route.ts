import { AnthropicStream, StreamingTextResponse } from 'ai';
import { AnthropicBedrock } from '@anthropic-ai/bedrock-sdk';
import env from '@/environment';

const { awsRegion, awsAccessKey, awsSecretKey } = env;

const anthropic = new AnthropicBedrock({ awsRegion, awsAccessKey, awsSecretKey });

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
