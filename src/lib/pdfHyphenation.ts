import { Font } from "@react-pdf/renderer";

/** Words longer than this are split so react-pdf can wrap them instead of running off the page. */
const LONG_WORD_LENGTH = 18;
const WORD_CHUNK_LENGTH = 12;

let registered = false;

/** Keep normal words whole (no automatic hyphens) and break very long strings into chunks. */
export function registerPdfHyphenation(): void {
  if (registered) return;
  registered = true;
  Font.registerHyphenationCallback((word) => {
    if (word.length <= LONG_WORD_LENGTH) return [word];
    return word.match(new RegExp(`.{1,${WORD_CHUNK_LENGTH}}`, "g")) ?? [word];
  });
}
