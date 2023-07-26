import Container from '@/components/Container';
import QuickQuestions from '@/components/QuickQuestions';
import Title from '@/components/Title';

export default async function Home() {
  return (
    <>
      <main className="flex justify-center pt-12">
        <Container>
          <Container className="w-72">
            <Title className="self-start">Quick questions</Title>
            <QuickQuestions />
          </Container>
        </Container>
      </main>
    </>
  );
}
