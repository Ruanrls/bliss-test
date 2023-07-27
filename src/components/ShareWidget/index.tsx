'use client';
import fetchMiddleware from '@/config/fetch';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Loading from '../Loading';
import Modal from '../Modal';

const ShareWidget = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => setIsOpened(true);

  const [email, setEmail] = useState('');
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const params = new URLSearchParams({
      destination_email: email,
      content_url: window.location.href,
    });

    await fetchMiddleware.fetch(`/share?${params.toString()}`, {
      method: 'POST',
    });

    setEmail('');
    setIsSubmitting(false);
    setIsOpened(false);
  };

  return (
    <>
      <Modal isOpen={isOpened}>
        <h3 className="font-bold text-2xl">Share this page!</h3>
        <Loading
          isLoading={isSubmitting}
          fallback={
            <p className="text-lg mt-4">
              We are sharing this page with the provided email, thank you!
            </p>
          }
        >
          <p className="text-lg mt-4">
            Share this page with your friends and family!
          </p>
          <form className="mt-4" onSubmit={handleShare}>
            <Input
              label="Email"
              type="email"
              onChange={handleEmailChange}
              value={email}
            />
            <Button className="w-full mt-4" type="submit">
              Share
            </Button>
          </form>
        </Loading>
      </Modal>

      <button
        type="button"
        onClick={handleOpen}
        className="flex h-min items-center bg-green-400 rounded text-white py-2 px-2 divide-x hover:bg-green-500 hover:shadow-lg"
      >
        <Image
          src="/icons/share.svg"
          alt="share icon svg"
          className="mr-2"
          width={24}
          height={24}
        />
        <span className="font-bold pl-2">SHARE</span>
      </button>
    </>
  );
};

export default ShareWidget;
