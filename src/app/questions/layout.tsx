import Container from '@/components/Container';
import ShareWidget from '@/components/ShareWidget';

import Title from '@/components/Title';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center pt-12">
      <ShareWidget />
      <Container className="max-w-[1720px] px-8">
        <Title>Quick questions</Title>
        {children}
      </Container>
    </main>
  );
}
