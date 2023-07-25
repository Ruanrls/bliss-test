import Container from '@/components/Container';
import Input from '@/components/Input';
import Title from '@/components/Title';

export default function Home() {
  return (
    <main className="flex justify-center pt-12">
      <Container>
        <Container className="w-72">
          <Title className="self-start">Quick questions</Title>

          <form className="mt-8 w-full">
            <Input id="question" label="Question" />
          </form>
        </Container>
      </Container>
    </main>
  );
}
