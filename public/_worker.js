export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/substack-feed') {
      const response = await fetch('https://rossdevlin.substack.com/feed');
      const text = await response.text();
      return new Response(text, {
        headers: {
          'Content-Type': 'application/rss+xml',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
