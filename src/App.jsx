import { useState } from "react";

const VOWELS = ["a", "i", "u", "e", "o"];
const CONSONANTS = ["∅", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n̄"];

// Data: [hiragana, katakana, source_kanji_hiragana, source_kanji_katakana, romaji]
const KANA_DATA = {
  "∅-a": ["あ", "ア", "安", "阿", "a"],
  "∅-i": ["い", "イ", "以", "伊", "i"],
  "∅-u": ["う", "ウ", "宇", "宇", "u"],
  "∅-e": ["え", "エ", "衣", "江", "e"],
  "∅-o": ["お", "オ", "於", "於", "o"],
  "k-a": ["か", "カ", "加", "加", "ka"],
  "k-i": ["き", "キ", "幾", "幾", "ki"],
  "k-u": ["く", "ク", "久", "久", "ku"],
  "k-e": ["け", "ケ", "計", "介", "ke"],
  "k-o": ["こ", "コ", "己", "己", "ko"],
  "s-a": ["さ", "サ", "左", "散", "sa"],
  "s-i": ["し", "シ", "之", "之", "shi"],
  "s-u": ["す", "ス", "寸", "須", "su"],
  "s-e": ["せ", "セ", "世", "世", "se"],
  "s-o": ["そ", "ソ", "曽", "曽", "so"],
  "t-a": ["た", "タ", "太", "多", "ta"],
  "t-i": ["ち", "チ", "知", "千", "chi"],
  "t-u": ["つ", "ツ", "川", "川", "tsu"],
  "t-e": ["て", "テ", "天", "天", "te"],
  "t-o": ["と", "ト", "止", "止", "to"],
  "n-a": ["な", "ナ", "奈", "奈", "na"],
  "n-i": ["に", "ニ", "仁", "仁", "ni"],
  "n-u": ["ぬ", "ヌ", "奴", "奴", "nu"],
  "n-e": ["ね", "ネ", "祢", "祢", "ne"],
  "n-o": ["の", "ノ", "乃", "乃", "no"],
  "h-a": ["は", "ハ", "波", "八", "ha"],
  "h-i": ["ひ", "ヒ", "比", "比", "hi"],
  "h-u": ["ふ", "フ", "不", "不", "fu"],
  "h-e": ["へ", "ヘ", "部", "部", "he"],
  "h-o": ["ほ", "ホ", "保", "保", "ho"],
  "m-a": ["ま", "マ", "末", "末", "ma"],
  "m-i": ["み", "ミ", "美", "三", "mi"],
  "m-u": ["む", "ム", "武", "牟", "mu"],
  "m-e": ["め", "メ", "女", "女", "me"],
  "m-o": ["も", "モ", "毛", "毛", "mo"],
  "y-a": ["や", "ヤ", "也", "也", "ya"],
  "y-i": null,
  "y-u": ["ゆ", "ユ", "由", "由", "yu"],
  "y-e": null,
  "y-o": ["よ", "ヨ", "与", "与", "yo"],
  "r-a": ["ら", "ラ", "良", "良", "ra"],
  "r-i": ["り", "リ", "利", "利", "ri"],
  "r-u": ["る", "ル", "留", "流", "ru"],
  "r-e": ["れ", "レ", "礼", "礼", "re"],
  "r-o": ["ろ", "ロ", "呂", "呂", "ro"],
  "w-a": ["わ", "ワ", "和", "和", "wa"],
  "w-i": ["ゐ", "ヰ", "為", "井", "wi†"],
  "w-u": null,
  "w-e": ["ゑ", "ヱ", "恵", "恵", "we†"],
  "w-o": ["を", "ヲ", "遠", "乎", "wo"],
  "n̄-a": ["ん", "ン", "无", "尓", "n"],
};

// Dakuten / handakuten data
const DAKUTEN_DATA = {
  "g-a": ["が", "ガ", "ga"], "g-i": ["ぎ", "ギ", "gi"], "g-u": ["ぐ", "グ", "gu"], "g-e": ["げ", "ゲ", "ge"], "g-o": ["ご", "ゴ", "go"],
  "z-a": ["ざ", "ザ", "za"], "z-i": ["じ", "ジ", "ji"], "z-u": ["ず", "ズ", "zu"], "z-e": ["ぜ", "ゼ", "ze"], "z-o": ["ぞ", "ゾ", "zo"],
  "d-a": ["だ", "ダ", "da"], "d-i": ["ぢ", "ヂ", "ji†"], "d-u": ["づ", "ヅ", "zu†"], "d-e": ["で", "デ", "de"], "d-o": ["ど", "ド", "do"],
  "b-a": ["ば", "バ", "ba"], "b-i": ["び", "ビ", "bi"], "b-u": ["ぶ", "ブ", "bu"], "b-e": ["べ", "ベ", "be"], "b-o": ["ぼ", "ボ", "bo"],
  "p-a": ["ぱ", "パ", "pa"], "p-i": ["ぴ", "ピ", "pi"], "p-u": ["ぷ", "プ", "pu"], "p-e": ["ぺ", "ペ", "pe"], "p-o": ["ぽ", "ポ", "po"],
};
const DAKUTEN_CONSONANTS = ["g", "z", "d", "b", "p"];

const NOTES = {
  "shi": "し/シ: Romanised 'shi' (not 'si') — palatalised before /i/",
  "chi": "ち/チ: Romanised 'chi' (not 'ti') — affricate before /i/",
  "tsu": "つ/ツ: Romanised 'tsu' (not 'tu') — affricate before /u/",
  "fu": "ふ/フ: Romanised 'fu' (not 'hu') — bilabial fricative, between 'f' and 'h'",
  "wi†": "ゐ/ヰ: Obsolete since 1946. Now pronounced as 'i'",
  "we†": "ゑ/ヱ: Obsolete since 1946. Now pronounced as 'e'",
  "wo": "を/ヲ: Now pronounced 'o'. Survives only as the accusative particle",
  "n": "ん/ン: The only kana not ending in a vowel. Pronunciation varies by context",
  "ji†": "ぢ/ヂ: Same pronunciation as じ/ジ (ji). Used only in specific etymological contexts",
  "zu†": "づ/ヅ: Same pronunciation as ず/ズ (zu). Used only in specific etymological contexts",
};

function KanaCell({ data, onClick, isSelected }) {
  if (!data) return <div style={styles.emptyCell}>—</div>;
  const [hira, kata, kanjiH, kanjiK, romaji] = data;
  const sameKanji = kanjiH === kanjiK;

  return (
    <div
      style={{
        ...styles.cell,
        ...(isSelected ? styles.cellSelected : {}),
      }}
      onClick={() => onClick(data)}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = "#f7f5f0";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = "#fdfcfa";
      }}
    >
      <div style={styles.romaji}>{romaji.replace("†", "")}</div>
      <div style={styles.kanaRow}>
        <span style={styles.hiragana}>{hira}</span>
        <span style={styles.katakana}>{kata}</span>
      </div>
      <div style={styles.kanjiOrigin}>
        {sameKanji ? (
          <span style={styles.kanjiShared}>{kanjiH}</span>
        ) : (
          <>
            <span style={styles.kanjiH}>{kanjiH}</span>
            <span style={styles.kanjiDivider}>/</span>
            <span style={styles.kanjiK}>{kanjiK}</span>
          </>
        )}
      </div>
    </div>
  );
}

function DakutenCell({ data }) {
  if (!data) return <div style={styles.emptyCell}>—</div>;
  const [hira, kata, romaji] = data;
  return (
    <div style={styles.dakutenCell}>
      <div style={styles.romaji}>{romaji.replace("†", "")}</div>
      <div style={styles.kanaRow}>
        <span style={styles.hiraganaSmall}>{hira}</span>
        <span style={styles.katakanaSmall}>{kata}</span>
      </div>
    </div>
  );
}

export default function KanaDerivationChart() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("gojuon");

  const handleClick = (data) => {
    if (selected && selected[0] === data[0]) {
      setSelected(null);
    } else {
      setSelected(data);
    }
  };

  const selectedNote = selected ? NOTES[selected[4]] : null;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>五十音 — Gojūon</h1>
        <p style={styles.subtitle}>
          The derivation of kana from kanji
        </p>
      </header>

      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={styles.legendDotH} />
          <span style={styles.legendLabel}>Hiragana (cursive simplification)</span>
        </div>
        <div style={styles.legendItem}>
          <span style={styles.legendDotK} />
          <span style={styles.legendLabel}>Katakana (component extraction)</span>
        </div>
        <div style={styles.legendItem}>
          <span style={styles.legendDotO} />
          <span style={styles.legendLabel}>Source kanji — <span style={{color:"#8b6914"}}>shared</span> or <span style={{color:"#c25a3c"}}>ひ</span>/<span style={{color:"#2a6496"}}>カ</span></span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={styles.tabBar}>
        <button
          style={tab === "gojuon" ? styles.tabActive : styles.tab}
          onClick={() => setTab("gojuon")}
        >
          Basic 46 + Origins
        </button>
        <button
          style={tab === "dakuten" ? styles.tabActive : styles.tab}
          onClick={() => setTab("dakuten")}
        >
          Dakuten & Handakuten
        </button>
      </div>

      {tab === "gojuon" && (
        <>
          {/* Vowel header */}
          <div style={styles.gridContainer}>
            <div style={styles.cornerCell} />
            {VOWELS.map((v) => (
              <div key={v} style={styles.vowelHeader}>{v}</div>
            ))}

            {CONSONANTS.map((c) => {
              const isNFinal = c === "n̄";
              return [
                <div key={`label-${c}`} style={styles.consLabel}>
                  {isNFinal ? "(n)" : c === "∅" ? "—" : c + "-"}
                </div>,
                ...VOWELS.map((v) => {
                  const key = `${c}-${v}`;
                  const data = KANA_DATA[key];
                  if (isNFinal && v !== "a") {
                    return <div key={key} style={styles.emptyCell} />;
                  }
                  return (
                    <KanaCell
                      key={key}
                      data={data}
                      onClick={handleClick}
                      isSelected={selected && data && selected[0] === data[0]}
                    />
                  );
                }),
              ];
            })}
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={styles.detailPanel}>
              <div style={styles.detailMain}>
                <div style={styles.detailKana}>
                  <span style={styles.detailHira}>{selected[0]}</span>
                  <span style={styles.detailKata}>{selected[1]}</span>
                </div>
                <div style={styles.detailRomaji}>/{selected[4].replace("†", "")}/</div>
              </div>
              <div style={styles.detailDerivation}>
                <div style={styles.derivRow}>
                  <span style={styles.derivLabel}>Hiragana from</span>
                  <span style={styles.derivKanji}>{selected[2]}</span>
                  <span style={styles.derivArrow}>→</span>
                  <span style={styles.derivResult}>{selected[0]}</span>
                  <span style={styles.derivMethod}>(cursive)</span>
                </div>
                <div style={styles.derivRow}>
                  <span style={styles.derivLabel}>Katakana from</span>
                  <span style={styles.derivKanji}>{selected[3]}</span>
                  <span style={styles.derivArrow}>→</span>
                  <span style={styles.derivResult}>{selected[1]}</span>
                  <span style={styles.derivMethod}>(component)</span>
                </div>
                {selected[2] === selected[3] && (
                  <div style={styles.sharedNote}>
                    Both derived from the same kanji — via different methods
                  </div>
                )}
              </div>
              {selectedNote && <div style={styles.noteBox}>{selectedNote}</div>}
            </div>
          )}
        </>
      )}

      {tab === "dakuten" && (
        <>
          <p style={styles.dakutenExplain}>
            Voiced (゛ dakuten) and semi-voiced (゜ handakuten) variants. These are
            not derived from separate kanji — they modify existing kana with diacritical marks.
          </p>
          <div style={styles.dakutenGrid}>
            <div style={styles.cornerCell} />
            {VOWELS.map((v) => (
              <div key={v} style={styles.vowelHeader}>{v}</div>
            ))}
            {DAKUTEN_CONSONANTS.map((c) => [
              <div key={`label-${c}`} style={styles.consLabel}>
                {c}-
              </div>,
              ...VOWELS.map((v) => {
                const key = `${c}-${v}`;
                return <DakutenCell key={key} data={DAKUTEN_DATA[key]} />;
              }),
            ])}
          </div>
          <div style={styles.dakutenNote}>
            <strong>g-</strong> = k + ゛ &nbsp;|&nbsp; <strong>z-</strong> = s + ゛ &nbsp;|&nbsp; <strong>d-</strong> = t + ゛ &nbsp;|&nbsp; <strong>b-</strong> = h + ゛ &nbsp;|&nbsp; <strong>p-</strong> = h + ゜
          </div>
        </>
      )}

      <footer style={styles.footer}>
        <p>Tap any cell in the basic table for derivation details. † marks obsolete or duplicate readings.</p>
        <p style={{marginTop: 4, opacity: 0.5}}>Source kanji reflect the standard 1900 codification. Earlier usage varied by writer and region.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Noto Serif JP', 'Hiragino Mincho Pro', 'Yu Mincho', Georgia, serif",
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 16px",
    background: "#faf8f4",
    minHeight: "100vh",
    color: "#2c2418",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottom: "2px solid #d4c5a0",
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "0.05em",
    color: "#2c2418",
  },
  subtitle: {
    fontSize: 14,
    color: "#7a6d55",
    margin: "6px 0 0 0",
    fontStyle: "italic",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    marginBottom: 16,
    fontSize: 12,
    color: "#6b5e48",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  legendDotH: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#c25a3c",
  },
  legendDotK: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: 2,
    background: "#2a6496",
  },
  legendDotO: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: 2,
    background: "#8b6914",
  },
  legendLabel: {
    fontSize: 11,
  },
  tabBar: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
  },
  tab: {
    padding: "7px 18px",
    border: "1px solid #c9b98a",
    background: "transparent",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "inherit",
    color: "#6b5e48",
    transition: "all 0.15s",
  },
  tabActive: {
    padding: "7px 18px",
    border: "1px solid #8b6914",
    background: "#8b6914",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "inherit",
    color: "#fff",
    fontWeight: 600,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "44px repeat(5, 1fr)",
    gap: 3,
    marginBottom: 16,
  },
  cornerCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vowelHeader: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 15,
    padding: "4px 0",
    color: "#8b6914",
    borderBottom: "2px solid #d4c5a0",
  },
  consLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    color: "#8b6914",
    borderRight: "2px solid #d4c5a0",
    paddingRight: 6,
  },
  cell: {
    background: "#fdfcfa",
    border: "1px solid #e4dcc8",
    borderRadius: 5,
    padding: "6px 2px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    minHeight: 72,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  cellSelected: {
    background: "#f0ead4",
    border: "2px solid #8b6914",
    boxShadow: "0 2px 8px rgba(139,105,20,0.15)",
  },
  emptyCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ccc",
    fontSize: 14,
  },
  romaji: {
    fontSize: 10,
    color: "#8b7a52",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  kanaRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    alignItems: "baseline",
  },
  hiragana: {
    fontSize: 22,
    color: "#c25a3c",
    fontWeight: 400,
  },
  katakana: {
    fontSize: 22,
    color: "#2a6496",
    fontWeight: 400,
  },
  hiraganaSmall: {
    fontSize: 20,
    color: "#c25a3c",
  },
  katakanaSmall: {
    fontSize: 20,
    color: "#2a6496",
  },
  kanjiOrigin: {
    fontSize: 12,
    color: "#7a6d55",
    marginTop: 1,
  },
  kanjiShared: {
    color: "#8b6914",
    fontWeight: 600,
  },
  kanjiH: {
    color: "#c25a3c",
    fontSize: 11,
  },
  kanjiDivider: {
    color: "#c9b98a",
    margin: "0 1px",
    fontSize: 10,
  },
  kanjiK: {
    color: "#2a6496",
    fontSize: 11,
  },
  detailPanel: {
    background: "#fff",
    border: "1px solid #d4c5a0",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 2px 12px rgba(139,105,20,0.08)",
  },
  detailMain: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 14,
    borderBottom: "1px solid #eee6d0",
    paddingBottom: 14,
  },
  detailKana: {
    display: "flex",
    gap: 12,
  },
  detailHira: {
    fontSize: 48,
    color: "#c25a3c",
  },
  detailKata: {
    fontSize: 48,
    color: "#2a6496",
  },
  detailRomaji: {
    fontSize: 20,
    color: "#8b7a52",
    fontStyle: "italic",
  },
  detailDerivation: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  derivRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
  },
  derivLabel: {
    color: "#7a6d55",
    minWidth: 110,
    fontSize: 12,
  },
  derivKanji: {
    fontSize: 26,
    color: "#2c2418",
    fontWeight: 500,
  },
  derivArrow: {
    color: "#c9b98a",
    fontSize: 18,
  },
  derivResult: {
    fontSize: 26,
  },
  derivMethod: {
    fontSize: 11,
    color: "#a09478",
    fontStyle: "italic",
  },
  sharedNote: {
    fontSize: 11,
    color: "#8b6914",
    fontStyle: "italic",
    marginTop: 4,
    paddingLeft: 2,
  },
  noteBox: {
    marginTop: 12,
    padding: "8px 12px",
    background: "#faf5e8",
    borderLeft: "3px solid #d4c5a0",
    fontSize: 12,
    color: "#6b5e48",
    borderRadius: "0 4px 4px 0",
  },
  dakutenExplain: {
    fontSize: 13,
    color: "#6b5e48",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 1.5,
    maxWidth: 520,
    marginLeft: "auto",
    marginRight: "auto",
  },
  dakutenGrid: {
    display: "grid",
    gridTemplateColumns: "44px repeat(5, 1fr)",
    gap: 3,
    marginBottom: 12,
    maxWidth: 540,
    marginLeft: "auto",
    marginRight: "auto",
  },
  dakutenCell: {
    background: "#fdfcfa",
    border: "1px solid #e4dcc8",
    borderRadius: 5,
    padding: "8px 2px",
    textAlign: "center",
    minHeight: 56,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  dakutenNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#7a6d55",
    marginTop: 8,
    marginBottom: 16,
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#a09478",
    borderTop: "1px solid #e4dcc8",
    paddingTop: 14,
    marginTop: 8,
    lineHeight: 1.5,
  },
};
