'use client';
import fetchMiddleware from '@/config/fetch';
import { Choice, Question } from '@/types/question';
import classNames from 'classnames';
import { useMemo, useState } from 'react';

type Props = {
  question: Question;
};

const VoteChoiceList = ({ question }: Props) => {
  const [questionState, setQuestionState] = useState<Question>(question);
  const [selectedChoice, setSelectedChoice] = useState<Choice>();

  const handleVote = async (choice: Choice) => {
    setSelectedChoice(choice);

    const body = {
      ...questionState,
      choices: questionState.choices.map((c) => {
        if (c.choice === choice.choice) {
          c.votes++;
        }

        return c;
      }),
    };

    setQuestionState(body);

    fetchMiddleware.fetch(`/questions/${question.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  };

  const disableButtons = useMemo(() => {
    return selectedChoice !== undefined;
  }, [selectedChoice]);

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {questionState.choices.map((choice) => (
        <button
          key={choice.choice}
          disabled={disableButtons}
          onClick={() => handleVote(choice)}
          className={classNames(
            'flex justify-center items-center w-full bg-gray-200 shadow-lg rounded py-2',
            {
              'hover:bg-gray-300 cursor-pointer': !disableButtons,
              'bg-green-400': selectedChoice?.choice === choice.choice,
              'cursor-not-allowed': disableButtons,
            }
          )}
        >
          {choice.choice}
          <span className="font-bold">&nbsp;{choice.votes}</span>
        </button>
      ))}
    </div>
  );
};

export default VoteChoiceList;
