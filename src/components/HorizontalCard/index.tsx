import classNames from 'classnames';
import Image from 'next/image';

type Props = {
  image: string;
  children: React.ReactNode;
  changeColorOnHover?: boolean;
};

const HorizontalCard = ({
  image,
  children,
  changeColorOnHover = true,
}: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-row items-center bg-gray-100 border border-gray-200 rounded-lg shadow-lg',
        { 'hover:bg-gray-100': changeColorOnHover }
      )}
    >
      <div className="relative w-80 h-44">
        <Image
          alt="Question"
          className="object-cover rounded-tl-lg rounded-bl-lg"
          src={image}
          fill
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        {children}
      </div>
    </div>
  );
};

export default HorizontalCard;
