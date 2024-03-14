import { Chat } from '@/components/chat';

export default async function IndexPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />;
}
