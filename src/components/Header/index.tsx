'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import ShareWidget from '../ShareWidget';
import Title from '../Title';

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex justify-between w-full p-8 bg-gray-200 shadow-lg">
      <Link href="/questions">
        <Title>
          <span data-testid="questionalizing">Questionalizing</span>
        </Title>
      </Link>
      <button type="button" data-testid="click-button" onClick={handleClick}>
        click me
      </button>
      {isClicked && <span data-testid="clicked"></span>}
      <ShareWidget />
    </div>
  );
};

export default Header;
