import Image from 'next/image';

type Props = {
  image: string;
  children: React.ReactNode;
};

const HorizontalCard = ({ image, children }: Props) => {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
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
