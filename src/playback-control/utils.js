/**
 * convert number of seconds to time code format
 * @params {Number} value - number of seconds
 * @params {Integer} precision - number of decimal places to round to
 * @params {String} format - h: hours, m: minutes, s: seconds, S: fractional seconds
 */
export function formatTimeCode(value, format = '{hh}:{mm}:{ss}.{SSS}') {
  const formatters = {
    h: (format.match(/\{(h+)\}/) || [])[1],
    m: (format.match(/\{(m+)\}/) || [])[1],
    s: (format.match(/\{(s+)\}/) || [])[1],
    S: (format.match(/\{(S+)\}/) || [])[1]
  };

  const parts = {
    h: x => Math.floor(x / 3600),
    m: x => Math.floor(x / 60) % 60,
    s: x => Math.floor(x % 60),
    S: (x, len) => Math.floor((x % 1) * Math.pow(10, len))
  };

  let result = format;
  for (const key in parts) {
    const f = formatters[key] || '';
    if (f) {
      const digits = f.length;
      result = result.replace(`{${f}}`, String(parts[key](value, digits)).padStart(digits, '0'));
    }
  }
  return result;
}

/*
 * Get ticks for a timeline
 * @params {d3.Scale} scale - a scale that maps domain (time, seconds) to range (x, pixels)
 * @params {Number} spacing - spacing between ticks in pixels
 * @returns {Array} ticks in the shape of {x, label}
 */
export function getTimelineTicks(scale, spacing = 50, format) {
  const range = scale.range();
  const domain = scale.domain();
  const ticksCount = Math.floor((range[1] - range[0]) / spacing) + 1;

  scale.domain([0, domain[1] - domain[0]]);
  const ticks = scale.ticks(ticksCount);
  scale.domain(domain);

  return ticks.map(t => ({
    x: scale(t + domain[0]),
    label: format(t + domain[0])
  }));
}
