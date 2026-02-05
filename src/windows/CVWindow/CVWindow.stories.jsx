import { CVWindow } from './CVWindow';

export default {
  title: 'Windows/CVWindow',
  component: CVWindow,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '500px',
          height: '600px',
          overflow: 'auto',
          background: 'white',
          border: '1px solid #ccc',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Mock data for stories
const mockCV = {
  name: 'Ross Devlin',
  title: 'Software Engineer',
  contact: {
    email: 'ross@rossdevl.in',
    github: 'https://github.com/rossdevlin',
    linkedin: 'https://linkedin.com/in/rossdevlin',
  },
  summary:
    'Full-stack software engineer with experience building scalable web applications and developer tools.',
  experience: [
    {
      company: 'Tech Company',
      title: 'Senior Software Engineer',
      period: '2022 - Present',
      highlights: [
        'Led development of key features',
        'Mentored junior engineers',
        'Improved system performance by 40%',
      ],
    },
    {
      company: 'Previous Company',
      title: 'Software Engineer',
      period: '2019 - 2022',
      highlights: [
        'Built full-stack web applications',
        'Implemented CI/CD pipelines',
        'Collaborated with product teams',
      ],
    },
  ],
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
    frontend: ['React', 'Vue', 'CSS', 'HTML'],
    backend: ['Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    tools: ['Git', 'Docker', 'Kubernetes', 'Terraform'],
  },
  education: [
    {
      institution: 'University Name',
      degree: 'B.S. Computer Science',
      year: '2019',
    },
  ],
};

// Create a mock version that doesn't use fetch
function MockCVWindow({ data }) {
  return (
    <div style={{ padding: '16px', fontFamily: 'var(--font-system)', lineHeight: 1.5 }}>
      <header style={{ marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #808080' }}>
        <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{data.name}</h1>
        <p style={{ margin: '2px 0 4px', color: '#666', fontSize: '13px' }}>{data.title}</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {data.contact.email && (
            <a href={`mailto:${data.contact.email}`} style={{ color: '#000080', textDecoration: 'underline', fontSize: '11px' }}>
              {data.contact.email}
            </a>
          )}
          {data.contact.github && (
            <a href={data.contact.github} style={{ color: '#000080', textDecoration: 'underline', fontSize: '11px' }}>
              GitHub
            </a>
          )}
        </div>
      </header>
      <section style={{ marginBottom: '16px' }}>
        <p style={{ fontStyle: 'italic', color: '#444' }}>{data.summary}</p>
      </section>
      <section style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 8px', borderBottom: '1px solid #808080', paddingBottom: '2px', textTransform: 'uppercase' }}>
          Experience
        </h2>
        {data.experience.map((job, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{job.title}</strong>
              <span style={{ fontSize: '11px', color: '#666' }}>{job.period}</span>
            </div>
            <div style={{ color: '#666', fontSize: '11px' }}>{job.company}</div>
            <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
              {job.highlights.map((h, j) => (
                <li key={j} style={{ fontSize: '11px', marginBottom: '2px' }}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 8px', borderBottom: '1px solid #808080', paddingBottom: '2px', textTransform: 'uppercase' }}>
          Skills
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {Object.entries(data.skills).map(([cat, skills]) => (
            <div key={cat} style={{ padding: '4px', background: '#f5f5f5', border: '1px solid #808080' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', margin: '0 0 2px', textTransform: 'capitalize' }}>{cat}</h3>
              <div style={{ fontSize: '11px', color: '#444' }}>{skills.join(', ')}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const Loaded = {
  render: () => <MockCVWindow data={mockCV} />,
};

export const Loading = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '16px',
      }}
    >
      <span>Loading...</span>
    </div>
  ),
};

export const Error = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '16px',
        color: '#c00',
      }}
    >
      <span>Error: Failed to load CV data</span>
    </div>
  ),
};

export const MinimalData = {
  render: () => (
    <MockCVWindow
      data={{
        name: 'John Doe',
        title: 'Developer',
        contact: { email: 'john@example.com' },
        summary: 'A software developer.',
        experience: [],
        skills: { languages: ['JavaScript'] },
        education: [],
      }}
    />
  ),
};
