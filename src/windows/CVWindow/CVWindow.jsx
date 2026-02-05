import { useDataLoader } from '../../hooks/useDataLoader';
import styles from './CVWindow.module.css';

export function CVWindow({ dataUrl = '/data/cv.json' }) {
  const { data, loading, error } = useDataLoader(dataUrl);

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Loading...</span>
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

  if (!data) {
    return null;
  }

  return (
    <div className={styles.cv}>
      <header className={styles.header}>
        <h1 className={styles.name}>{data.name}</h1>
        <p className={styles.title}>{data.title}</p>
        {data.contact && (
          <div className={styles.contact}>
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
            )}
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        )}
      </header>

      {data.summary && (
        <section className={styles.section}>
          <p className={styles.summary}>{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {data.experience.map((job, index) => (
            <div key={index} className={styles.job}>
              <div className={styles.jobHeader}>
                <strong>{job.title}</strong>
                <span className={styles.period}>{job.period}</span>
              </div>
              <div className={styles.company}>{job.company}</div>
              {job.highlights && (
                <ul className={styles.highlights}>
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {data.skills && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className={styles.skillCategory}>
                <h3 className={styles.categoryName}>{category}</h3>
                <div className={styles.skillList}>
                  {skills.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className={styles.education}>
              <strong>{edu.degree}</strong>
              <span> - {edu.institution}</span>
              <span className={styles.year}> ({edu.year})</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default CVWindow;
