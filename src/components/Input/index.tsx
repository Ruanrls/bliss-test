import classNames from 'classnames';
import React from 'react';

type Props = React.HTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({ className, label, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={props.id} className="text-md font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={classNames(
          className,
          'py-1 px-2 font-medium text-md rounded-lg border border-gray-700 text-gray-700 focus:border-blue-500 focus:outline-blue-500'
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
