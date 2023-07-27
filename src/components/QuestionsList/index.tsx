import { Question } from '@/types/question';
import Image from 'next/image';
import HorizontalCard from '../HorizontalCard';
import Observer from '../Observer';

type Props = {
  questions: Question[];
  onReachEnd: () => void;
  isLoading: boolean;
};

const QuestionsList = ({ questions, onReachEnd, isLoading }: Props) => {
  const onIntersectEnd = (
    isIntersecting: boolean,
    observer: IntersectionObserver
  ) => {
    if (isIntersecting) {
      onReachEnd();
      observer.disconnect();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-1 w-full flex-wrap gap-4 justify-center align-center">
        {questions.map((question, index) => {
          const isLastElement = questions.length - 1 === index;

          const Card = (
            <HorizontalCard image={question.image_url}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {question.question}
              </h5>
            </HorizontalCard>
          );

          const id = `${question.id}-${index}`;

          if (isLastElement) {
            return (
              <Observer
                id={`${id}-observer`}
                key={`${id}-observer`}
                callback={onIntersectEnd}
                options={{
                  threshold: 1,
                  rootMargin: '0px 0px 400px 0px',
                }}
              >
                <div key={`${id}`} className="max-w-lg">
                  {Card}
                </div>
              </Observer>
            );
          }

          return (
            <div key={`${id}`} className="max-w-lg">
              {Card}
            </div>
          );
        })}
      </div>
      {isLoading && questions.length >= 0 && (
        <Image
          className="my-8"
          src="icons/loading-spinner-black.svg"
          alt="loading spinner"
          width={25}
          height={25}
        />
      )}
    </div>
  );
};

export default QuestionsList;
