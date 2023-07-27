import Link from 'next/link';
import ShareWidget from '../ShareWidget';
import Title from '../Title';

const Header = () => {
  return (
    <div className="flex justify-between w-full p-8 bg-gray-200 shadow-lg">
      <Link href="/questions">
        <Title>Questionalizing</Title>
      </Link>
      <ShareWidget />
    </div>
  );
};

export default Header;
