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

  const renderJobList = (jobs) =>
    jobs.map((job, index) => (
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
    ));

  return (
    <div className={styles.cv}>
      <section className={styles.section}>
        <p className={styles.bio}>Storyteller with work spanning text, audio, and video.</p>
        <p className={styles.bioLabel}>Underway in 2026:</p>
        <ul className={styles.bioList}>
          <li>Sei Qui (with Danny Leyland — single channel video and 40-page zine)</li>
          <li>On My Way (with Larry Heard, 380 page photomemoir documenting Larry's worldwide musical adventures)</li>
        </ul>
      </section>

      <details className={styles.cvCollapsible}>
        <summary className={styles.cvSummary}>CV</summary>

        <header className={styles.header}>
          <h1 className={styles.name}>{data.name}</h1>
          <p className={styles.title}>{data.title}</p>
          {data.contact && (
            <div className={styles.contact}>
              {data.contact.email && (
                <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
              )}
              {data.contact.website && (
                <a href={data.contact.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
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

        {data.education && data.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className={styles.education}>
                <strong>{edu.institution}</strong>
                <span> — {edu.degree}</span>
                <span className={styles.year}> ({edu.year})</span>
              </div>
            ))}
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
            {renderJobList(data.experience)}
          </section>
        )}

        {data.freelance && data.freelance.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Freelance</h2>
            {renderJobList(data.freelance)}
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects + Awards</h2>
            {data.projects.map((project, index) => (
              <div key={index} className={styles.project}>
                <div className={styles.projectHeader}>
                  <strong>{project.name}</strong>
                  <span className={styles.year}>({project.year})</span>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
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
      </details>
    </div>
  );
}

export default CVWindow;
