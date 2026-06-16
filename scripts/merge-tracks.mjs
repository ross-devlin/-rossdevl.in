import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Read files
const csvText = readFileSync(resolve(root, 'Spins-search-results-1-2-21-1-1-25-for-WYXR.csv'), 'utf-8');
const episodes = JSON.parse(readFileSync(resolve(root, 'public/data/thrust.json'), 'utf-8'));

// Parse CSV (handle quoted fields with commas)
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

const lines = csvText.split('\n').filter(l => l.trim());
const header = parseCSVLine(lines[0]);
const rows = lines.slice(1).map(parseCSVLine);

// Abbreviated month -> full month
const monthMap = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
  May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December'
};

// Normalize CSV date "Dec 29, 2024" -> "December 29, 2024"
function normalizeDate(csvDate) {
  const match = csvDate.match(/^(\w+)\s+(\d+),\s+(\d+)$/);
  if (!match) return csvDate;
  const [, abbr, day, year] = match;
  const fullMonth = monthMap[abbr] || abbr;
  return `${fullMonth} ${parseInt(day)}, ${year}`;
}

// Group tracks by normalized date
const tracksByDate = {};
for (const row of rows) {
  const date = normalizeDate(row[0]);
  const track = {
    time: row[3],
    artist: row[4],
    song: row[5],
    release: row[6],
    label: row[9]
  };
  if (!tracksByDate[date]) tracksByDate[date] = [];
  tracksByDate[date].push(track);
}

// Sort tracks within each episode by time (earliest first)
for (const date of Object.keys(tracksByDate)) {
  tracksByDate[date].sort((a, b) => {
    const toMinutes = (t) => {
      const m = t.match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);
      if (!m) return 0;
      let [, h, min, sec, ampm] = m;
      h = parseInt(h);
      min = parseInt(min);
      sec = parseInt(sec);
      if (ampm.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (ampm.toUpperCase() === 'AM' && h === 12) h = 0;
      return h * 3600 + min * 60 + sec;
    };
    return toMinutes(a.time) - toMinutes(b.time);
  });
}

// Merge into episodes
let matched = 0;
let unmatched = 0;
for (const episode of episodes) {
  const tracks = tracksByDate[episode.date];
  if (tracks) {
    episode.tracks = tracks.map(({ artist, song, release, label }) => ({
      artist,
      song,
      ...(release ? { release } : {}),
      ...(label ? { label } : {})
    }));
    matched++;
  } else {
    unmatched++;
  }
}

console.log(`Matched: ${matched} episodes with tracklists`);
console.log(`Unmatched: ${unmatched} episodes without track data`);
console.log(`CSV dates: ${Object.keys(tracksByDate).length}`);

// Write output
writeFileSync(resolve(root, 'public/data/thrust.json'), JSON.stringify(episodes, null, 2));
console.log('Written to public/data/thrust.json');
