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
};

module.exports = nextConfig;
