import Container from '@/components/Container';
import Header from '@/components/Header';
import ShareWidget from '@/components/ShareWidget';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center">
      <ShareWidget />
      <Container>
        <Header />
        <Container className="max-w-[1720px] px-8">{children}</Container>
      </Container>
    </main>
  );
}
