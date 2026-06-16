import { useState, useRef, useCallback, useEffect } from 'react';
import { useDataLoader } from '../../hooks/useDataLoader';
import styles from './ThrustWindow.module.css';

export function ThrustWindow({ dataUrl = '/data/thrust.json' }) {
  const { data: episodes, loading, error } = useDataLoader(dataUrl);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const audioRef = useRef(null);
  const shouldAutoPlay = useRef(false);

  const playEpisode = useCallback((index) => {
    shouldAutoPlay.current = true;
    setCurrentIndex(index);
  }, []);

  const toggleTracklist = useCallback((e, index) => {
    e.stopPropagation();
    setExpandedIndex(prev => prev === index ? null : index);
  }, []);

  useEffect(() => {
    if (shouldAutoPlay.current && audioRef.current) {
      audioRef.current.play();
      shouldAutoPlay.current = false;
    }
  }, [currentIndex]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Loading episodes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span>Error: {error}</span>
      </div>
    );
  }

  if (!episodes) return null;

  const currentEpisode = currentIndex !== null ? episodes[currentIndex] : null;
  const totalEpisodes = episodes.length;

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h1 className={styles.title}>Thrust</h1>
        <p className={styles.subtitle}>FM radio show on 91.7fm WYXR (2020-2025)</p>
      </header>

      <div className={styles.player}>
        <div className={styles.playerInner}>
          {currentEpisode ? (
            <>
              <div className={styles.nowPlaying}>
                <span className={styles.nowPlayingLabel}>Now playing: </span>
                {currentEpisode.date}
                {currentEpisode.label && ` — ${currentEpisode.label}`}
              </div>
              <audio
                ref={audioRef}
                className={styles.audio}
                controls
                src={currentEpisode.url}
              />
            </>
          ) : (
            <div className={styles.playerEmpty}>
              Select an episode to play ({totalEpisodes} episodes)
            </div>
          )}
        </div>
      </div>

      <div className={styles.episodeList}>
        {episodes.map((episode, index) => {
          const isActive = index === currentIndex;
          const isExpanded = index === expandedIndex;
          const episodeNum = totalEpisodes - index;
          const hasTracks = episode.tracks && episode.tracks.length > 0;
          return (
            <div key={index} className={styles.episodeRow}>
              <div
                className={`${styles.episode} ${isActive ? styles.episodeActive : ''}`}
                onClick={() => playEpisode(index)}
              >
                {isActive && <span className={styles.playingIcon}>&#9654;</span>}
                <span className={styles.episodeNumber}>#{episodeNum}</span>
                <span className={styles.episodeDate}>{episode.date}</span>
                {episode.label && (
                  <span className={styles.episodeLabel}>{episode.label}</span>
                )}
                {hasTracks && (
                  <button
                    className={`${styles.trackToggle} ${isActive ? styles.trackToggleActive : ''}`}
                    onClick={(e) => toggleTracklist(e, index)}
                    title={isExpanded ? 'Hide tracklist' : 'Show tracklist'}
                  >
                    {isExpanded ? '\u25B4' : '\u25BE'} {episode.tracks.length} tracks
                  </button>
                )}
              </div>
              {isExpanded && hasTracks && (
                <div className={styles.tracklist}>
                  <table className={styles.trackTable}>
                    <thead>
                      <tr>
                        <th className={styles.trackNum}>#</th>
                        <th className={styles.trackArtist}>Artist</th>
                        <th className={styles.trackSong}>Song</th>
                        <th className={styles.trackRelease}>Release</th>
                      </tr>
                    </thead>
                    <tbody>
                      {episode.tracks.map((track, i) => (
                        <tr key={i} className={styles.trackRow}>
                          <td className={styles.trackNum}>{i + 1}</td>
                          <td className={styles.trackArtist}>{track.artist}</td>
                          <td className={styles.trackSong}>{track.song}</td>
                          <td className={styles.trackRelease}>{track.release}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThrustWindow;
