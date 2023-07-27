import Container from '@/components/Container';
import QuickQuestions from '@/components/QuickQuestions';
import Title from '@/components/Title';

export default async function Home() {
  return (
    <>
      <main className="flex justify-center pt-12">
        <Container className="max-w-[1720px] px-8">
          <Title>Quick questions</Title>
          <QuickQuestions />
        </Container>
      </main>
    </>
  );
}
