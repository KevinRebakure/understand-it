const formatLyrics = `Format these lyrics of this song for me and break it down into relevant sections.

Each section will have the a type and the content.

export type LyricsSection = {
  type:
    | "intro"
    | "chorus"
    | "verse"
    | "bridge"
    | "title"
    | "pre-chorus"
    | "outro";
  content: string;
};

export type Lyrics = LyricsSection[];

-----------------------------------------------------------------

INSTRUCTIONS

- At the very least a song should have a title, a verse and a chorus.
- Don't add any further comments or descriptions
- Return me a JSON array of the sections of the song
- It has to be in a simple format that I will JSON.parse()
- Don't start with \`\`\`json or things like that because it will crash the app
`;

export default formatLyrics;
