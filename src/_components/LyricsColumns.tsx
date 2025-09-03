import cn from "../app/utils/cn";

type Lyrics = {
  type: "chorus" | "verse" | "bridge" | "title";
  content: string;
};

function LyricsColumns() {
  // Update state when new props arrive

  return (
    <div className="col-span-3 grid grid-cols-2 w-[1000px] mx-auto gap-12">
      <div className="space-y-16">
        {originalLyricsFallback.map((lyric, i) => (
          <div key={lyric.type + i}>
            <p
              className={cn(
                "text-2xl leading-12",
                lyric.type === "title" && "text-5xl font-bold",
                lyric.type === "chorus" && "pl-10"
              )}
            >
              {lyric.content}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-16">
        {translatedLyricsFallback.map((lyric, i) => (
          <div key={lyric.type + i}>
            <p
              className={cn(
                "text-2xl leading-12",
                lyric.type === "title" && "text-5xl font-bold",
                lyric.type === "chorus" && "pl-10"
              )}
            >
              {lyric.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LyricsColumns;

export const originalLyricsFallback: Lyrics[] = [
  {
    type: "title",
    content: "A toi",
  },
  {
    type: "verse",
    content: `A toi, à la façon que tu as d'être belle
A la façon que tu as d'être à moi
A tes mots tendres un peu artificiels quelquefois
A toi, à la petite fille que tu étais
A celle que tu es encore souvent
A ton passé, à tes secrets
A tes anciens princes charmants`,
  },
  {
    type: "chorus",
    content: `A la vie, à l'amour
A nos nuits, à nos jours
A l'éternel retour de la chance
A l'enfant qui viendra
Qui nous ressemblera
Qui sera à la fois toi et moi`,
  },
  {
    type: "verse",
    content: `A moi, à la folie dont tu es la raison
A mes colères sans savoir pourquoi
A mes silences et à mes trahisons quelquefois
A moi, au temps que j'ai passé à te chercher
Aux qualités dont tu te moques bien
Aux défauts que je t'ai cachés
A mes idées de baladin`,
  },
  {
    type: "chorus",
    content: `A la vie, à l'amour
A nos nuits, à nos jours
A l'éternel retour de la chance
A l'enfant qui viendra
Qui nous ressemblera
Qui sera à la fois toi et moi`,
  },
  {
    type: "bridge",
    content: `A nous, aux souvenirs que nous allons nous faire
A l'avenir et au présent surtout
A la santé de cette vieille terre qui s'en fout
A nous, à nos espoirs et à nos illusions
A notre prochain premier rendez-vous
A la santé de ces millions d'amoureux
Qui sont comme nous`,
  },
  {
    type: "verse",
    content: `A toi, à la façon que tu as d'être belle
A la façon que tu as d'être à moi
A tes mots tendres un peu artificiels quelquefois
A toi, à la petite fille que tu étais
A celle que tu es encore souvent
A ton passé, à tes secrets
A tes anciens princes charmants`,
  },
];

export const translatedLyricsFallback: Lyrics[] = [
  {
    type: "title",
    content: "To You",
  },
  {
    type: "verse",
    content: `To you, to the way you are beautiful
To the way you belong to me
To your tender words, sometimes a little artificial
To you, to the little girl you once were
To the one you still often are
To your past, to your secrets
To your former charming princes`,
  },
  {
    type: "chorus",
    content: `To life, to love
To our nights, to our days
To the eternal return of luck
To the child who will come
Who will look like us
Who will be both you and me`,
  },
  {
    type: "verse",
    content: `To me, to the madness for which you are the reason
To my angers without knowing why
To my silences and sometimes my betrayals
To me, to the time I spent searching for you
To the qualities you laugh at
To the flaws I hid from you
To my minstrel-like ideas`,
  },
  {
    type: "chorus",
    content: `To life, to love
To our nights, to our days
To the eternal return of luck
To the child who will come
Who will look like us
Who will be both you and me`,
  },
  {
    type: "bridge",
    content: `To us, to the memories we will create
To the future and above all the present
To the health of this old earth that doesn’t care
To us, to our hopes and our illusions
To our next first date
To the health of those millions of lovers
Who are like us`,
  },
  {
    type: "verse",
    content: `To you, to the way you are beautiful
To the way you belong to me
To your tender words, sometimes a little artificial
To you, to the little girl you once were
To the one you still often are
To your past, to your secrets
To your former charming princes`,
  },
];
