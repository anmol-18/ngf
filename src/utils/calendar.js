function pad(n) {
  return String(n).padStart(2, '0');
}

function generateICS(dateStr, title = 'Date with you 💗') {
  const date = new Date(dateStr + 'T12:00:00');
  const end = new Date(date);
  end.setHours(end.getHours() + 2);

  const fmt = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//National Girlfriend Day//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(date)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    'DESCRIPTION:Our special day together 💕',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(dateStr) {
  const ics = generateICS(dateStr);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'our-date.ics';
  a.click();
  URL.revokeObjectURL(url);
}

function daysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export { downloadICS, daysUntil, formatDate };
