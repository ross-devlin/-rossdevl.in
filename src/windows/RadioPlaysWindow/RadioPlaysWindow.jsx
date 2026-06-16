import { useState, useEffect } from 'react';
import styles from './RadioPlaysWindow.module.css';

const EPISODES = [
  {
    number: 3,
    title: 'Lavender',
    label: '#214 — November 3, 2024',
    url: 'http://s3.amazonaws.com/wyxr-archive-bucket/all_files/20241103120012-38-1082-thrust-wyxr.mp3',
    transcriptUrl: '/data/radio-plays/lavender.txt',
  },
  {
    number: 2,
    title: 'The Haar',
    label: '#161 — October 31, 2023',
    url: 'http://s3.amazonaws.com/wyxr-archive-bucket/all_files/20231031131738-2023-10-29-thrust-wyxr-the-haar-episode-1.mp3',
    transcriptUrl: '/data/radio-plays/the-haar.txt',
  },
  {
    number: 1,
    title: 'The Hiss',
    label: '#108 — October 30, 2022',
    url: 'http://s3.amazonaws.com/wyxr-archive-bucket/all_files/20221030120007-38-377-thrust-wyxr.mp3',
    transcriptUrl: '/data/radio-plays/the-hiss.txt',
  },
];

function Episode({ number, title, label, url, transcriptUrl }) {
  const [open, setOpen] = useState(false);
  const [transcript, setTranscript] = useState(null);

  useEffect(() => {
    if (open && transcriptUrl && transcript === null) {
      fetch(transcriptUrl)
        .then(r => r.text())
        .then(setTranscript)
        .catch(() => setTranscript('Could not load transcript.'));
    }
  }, [open, transcriptUrl, transcript]);

  return (
    <div className={styles.episode}>
      <button
        className={styles.episodeHeader}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{number}. {title}</span>
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={styles.episodeBody}>
          <p className={styles.episodeLabel}>{label}</p>
          <audio className={styles.audio} controls src={url} />
          {transcriptUrl && (
            <div className={styles.transcript}>
              {transcript === null
                ? <p className={styles.transcriptLoading}>Loading…</p>
                : <pre className={styles.transcriptText}>{transcript}</pre>
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function RadioPlaysWindow() {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>Radio Plays</h1>
      </header>

      <section className={styles.section}>
        <p className={styles.text}>
          From 2021–2024 I produced a "Spooky Halloween Special" for my radio program on WYXR.
          These aired on or around October 31st. I wrote an original story, produced and composed
          the soundtrack, and recorded the reading. You can listen to the original broadcast and
          read the text below:
        </p>
      </section>

      <section className={styles.section}>
        {EPISODES.map(ep => (
          <Episode key={ep.number} {...ep} />
        ))}
      </section>
    </div>
  );
}

export default RadioPlaysWindow;
