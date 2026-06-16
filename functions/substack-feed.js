export async function onRequest() {
  const response = await fetch('https://rossdevlin.substack.com/feed');
  const text = await response.text();
  return new Response(text, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
