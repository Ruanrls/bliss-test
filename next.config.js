/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/questions',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['dummyimage.com'],
  },
};

module.exports = nextConfig;
