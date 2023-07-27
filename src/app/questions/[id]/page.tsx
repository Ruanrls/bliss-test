import HorizontalCard from '@/components/HorizontalCard';
import VoteChoiceList from '@/components/VoteChoiceList';
import fetchMiddleware from '@/config/fetch';
import { Question } from '@/types/question';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps) {
  const question = await fetchMiddleware.fetch<Question>(`/questions/${id}`);

  return (
    <div className="mt-8">
      <HorizontalCard image={question.image_url} changeColorOnHover={false}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {question.question}
        </h5>
        <VoteChoiceList question={question} />
      </HorizontalCard>
    </div>
  );
}
