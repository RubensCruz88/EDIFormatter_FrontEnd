/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  pageExtensions: [
	'page.tsx',
	'api.ts',
	'api.tsx'
  ]
}

module.exports = nextConfig
