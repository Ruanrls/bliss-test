import { Question } from '@/types/question';
import HorizontalCard from '../HorizontalCard';

type Props = { questions: Question[] };

const QuestionsList = ({ questions }: Props) => {
  return (
    <div className="flex flex-1 w-full flex-wrap gap-4 justify-center align-center">
      {questions.map((question) => (
        <div key={`${question.id}-${Math.random()}`} className="max-w-lg">
          <HorizontalCard image={question.image_url}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              {question.question}
            </h5>
          </HorizontalCard>
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
