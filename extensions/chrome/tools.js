function prettyJson(input, minify) {
  const value = JSON.parse(input);
  return minify ? JSON.stringify(value) : JSON.stringify(value, null, 2);
}
function base64Encode(input) { const bytes = new TextEncoder().encode(input); let binary=''; bytes.forEach(b => binary += String.fromCharCode(b)); return btoa(binary); }
function base64Decode(input) { const binary = atob(input.trim()); const bytes = Uint8Array.from(binary, c => c.charCodeAt(0)); return new TextDecoder().decode(bytes); }
function jwtDecode(input) {
  const parts = input.trim().split('.');
  if (parts.length !== 3) throw new Error('A JWT must contain three dot-separated parts.');
  const decode = part => {
    const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(base64Decode(normalized.padEnd(normalized.length + (4-normalized.length%4)%4, '=')));
  };
  return JSON.stringify({header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2]}, null, 2);
}
async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function timestamp(input) {
  const n = Number(input.trim());
  if (!Number.isFinite(n)) throw new Error('Enter a Unix timestamp.');
  const ms = Math.abs(n) < 100000000000 ? n * 1000 : n;
  return new Date(ms).toISOString();
}
function regexTest(input, pattern, flags) {
  const re = new RegExp(pattern, flags);
  const matches = input.match(re);
  return matches ? JSON.stringify({matched:true,matches:Array.from(matches)}, null, 2) : '{\n  "matched": false,\n  "matches": []\n}';
}
function convertCase(input, mode) {
  if (mode === 'upper') return input.toUpperCase();
  if (mode === 'lower') return input.toLowerCase();
  if (mode === 'title') return input.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  if (mode === 'camel') return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_,c)=>c.toUpperCase()).replace(/^(.)/, (_,c)=>c.toLowerCase());
  return input;
}
async function runTool(tool, input, extra) {
  switch(tool) {
    case 'json': return prettyJson(input, false);
    case 'minify': return prettyJson(input, true);
    case 'base64-encode': return base64Encode(input);
    case 'base64-decode': return base64Decode(input);
    case 'url-encode': return encodeURIComponent(input);
    case 'url-decode': return decodeURIComponent(input);
    case 'jwt': return jwtDecode(input);
    case 'sha256': return await sha256(input);
    case 'timestamp': return timestamp(input);
    case 'regex': return regexTest(input, extra.pattern || input, extra.flags || '');
    case 'case': return convertCase(input, extra.mode || 'upper');
    default: throw new Error('Unknown tool: ' + tool);
  }
}
