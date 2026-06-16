import { useState, useEffect } from 'react';
import styles from './PatternSeekingBrainWindow.module.css';

const FEED_URL = '/substack-feed';

function extractThumbnail(item) {
  const enclosure = item.querySelector('enclosure');
  if (enclosure && (enclosure.getAttribute('type') || '').startsWith('image/')) {
    return enclosure.getAttribute('url');
  }

  const encoded = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0];
  const html = encoded?.textContent || '';
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const jpegSource = doc.querySelector('source[type="image/jpeg"]');
  if (jpegSource) {
    const srcset = jpegSource.getAttribute('srcset') || '';
    const first = srcset.split(',')[0].trim().split(' ')[0];
    if (first) return first;
  }

  const img = doc.querySelector('img');
  return img?.src || null;
}

export function PatternSeekingBrainWindow() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then(res => res.text())
      .then(text => {
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);
        setPosts(items.map(item => ({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.nextSibling?.textContent || item.querySelector('link')?.textContent || '',
          pubDate: new Date(item.querySelector('pubDate')?.textContent).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          thumbnail: extractThumbnail(item),
        })));
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load posts.');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pattern Seeking Brain</h1>
        <p className={styles.subtitle}>Project Overview</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.text}>
          Pattern Seeking Brain is a online diary about my life in the world and on the internet.
        </p>
        <p className={styles.text}>
          <a href="https://substack.com/@patternseekingbrain" target="_blank" rel="noreferrer">Read my writing</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Latest Posts</h2>
        {loading && <p className={styles.text}>Loading…</p>}
        {error && <p className={styles.text}>{error}</p>}
        {!loading && !error && (
          <ul className={styles.postList}>
            {posts.map(post => (
              <li key={post.link} className={styles.postItem}>
                <a href={post.link} target="_blank" rel="noreferrer" className={styles.postLink}>
                  {post.thumbnail && (
                    <img src={post.thumbnail} alt="" className={styles.postThumb} />
                  )}
                  <span className={styles.postTitle}>{post.title}</span>
                  <span className={styles.postDate}>{post.pubDate}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default PatternSeekingBrainWindow;
