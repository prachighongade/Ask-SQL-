import { useState, useRef, useEffect } from "react";
import axios from "axios";
import chimeSound from './assets/chime.wav';

const API_BASE = "http://localhost:8000";

function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-['JetBrains_Mono'] text-sm">{'>'}</span>
          <span className="font-['Space_Grotesk'] font-bold text-base sm:text-lg tracking-tight">
            Ask<span className="text-[var(--accent)]">SQL</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <a href="#about" className="hidden sm:inline text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            About
          </a>
          <a href="#home" className="hidden sm:inline text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Home
          </a>
          <button
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="w-8 h-8 rounded-lg border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center shrink-0"
          >
            {theme === "dark" ? (
              // Sun icon (click to go light)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
              </svg>
            ) : (
              // Moon icon (click to go dark)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

const HERO_EXAMPLES = [
  {
    q: "How many orders per region?",
    sql: "SELECT region, COUNT(*)\nFROM orders\nGROUP BY region;",
  },
  {
    q: "Top 5 customers by spend",
    sql: "SELECT customer, SUM(amount) AS total\nFROM sales\nGROUP BY customer\nORDER BY total DESC\nLIMIT 5;",
  },
  {
    q: "Average delivery time by carrier",
    sql: "SELECT carrier, AVG(delivery_days)\nFROM shipments\nGROUP BY carrier;",
  },
];

// Types out "Talk to your data." then "Get back SQL." letter by letter,
// terminal-style, with a blinking cursor. Runs once on mount.
function TypewriterHeading() {
  const line1 = "Talk to your data.";
  const line2 = "Get back SQL.";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [phase, setPhase] = useState("line1"); // "line1" -> "line2" -> "done"

  useEffect(() => {
    let i = 0;
    const speed = 55; // ms per character
    const interval = setInterval(() => {
      i += 1;
      setText1(line1.slice(0, i));
      if (i >= line1.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("line2"), 250);
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "line2") return;
    let i = 0;
    const speed = 55;
    const interval = setInterval(() => {
      i += 1;
      setText2(line2.slice(0, i));
      if (i >= line2.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, speed);
    return () => clearInterval(interval);
  }, [phase]);

  const Cursor = ({ color }) => (
    <span
      className="inline-block w-[3px] sm:w-[4px] h-[0.85em] ml-1 align-middle animate-pulse-dot"
      style={{ backgroundColor: color }}
    />
  );

  return (
    <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-5xl tracking-tight leading-[1.05] mb-4 min-h-[92px] sm:min-h-[112px]">
      {text1}
      {phase === "line1" && <Cursor color="var(--text)" />}
      <br />
      <span className="text-[var(--accent)]">
        {text2}
        {phase !== "line1" && <Cursor color="var(--accent)" />}
      </span>
    </h1>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_EXAMPLES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const current = HERO_EXAMPLES[idx];

  return (
    <section id="about" className="relative overflow-hidden border-b border-[var(--border)]">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 75%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-14 sm:pb-20 relative">
        <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-['JetBrains_Mono'] text-[11px] text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
          english in, sql out
        </div>

        <TypewriterHeading />

        <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed max-w-md mb-9">
          Ask your data anything.
        </p>

        {/* rotating live example */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden mb-9 max-w-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-hover)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--border-hover)]" />
            <span className="text-[var(--text-muted)] text-xs font-['JetBrains_Mono'] ml-2">example.sql</span>
          </div>
          <div key={idx} className="animate-in p-4 font-['JetBrains_Mono'] text-xs sm:text-sm leading-relaxed min-h-[104px]">
            <p className="text-[var(--text-muted)] mb-2">{'> '}{current.q}</p>
            <pre className="text-[var(--accent)] whitespace-pre-wrap break-words">{current.sql}</pre>
          </div>
          <div className="flex items-center gap-1.5 px-4 pb-3">
            {HERO_EXAMPLES.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === idx ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-[var(--border-hover)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-['Space_Grotesk'] font-semibold px-4 py-2.5 rounded-lg bg-[var(--accent)] text-[#0A0A0A] hover:bg-[var(--accent-hover)] transition-colors"
          >
            Try it now ↓
          </a>
          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] text-[var(--text-muted)]">
            <span className="px-2 py-1 rounded border border-[var(--border)]">FastAPI</span>
            <span className="px-2 py-1 rounded border border-[var(--border)]">DuckDB</span>
            <span className="px-2 py-1 rounded border border-[var(--border)]">Llama 3.3 70B</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, active, done, children }) {
  return (
    <div className="relative pl-11 sm:pl-14">
      <div
        className={`absolute left-0 top-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-xs border transition-colors ${
          done
            ? "bg-[var(--accent-dim)] border-[var(--accent)] text-[var(--accent)]"
            : active
            ? "border-[var(--accent)] text-[var(--accent)]"
            : "border-[var(--border)] text-[var(--text-muted)]"
        }`}
      >
        {done ? "✓" : number}
      </div>
      <h2 className="font-['Space_Grotesk'] font-semibold text-[var(--text)] mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 text-center">
        <p className="text-sm text-[var(--text)]">
          Built by <span className="font-bold">Prachi Ghongade</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 font-['JetBrains_Mono'] text-xs">
          <a
            href="https://github.com/prachighongade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <span className="text-[var(--border)]">•</span>
          <a
            href="https://www.linkedin.com/in/prachi-ghongade-a82167296/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // --- Welcome chime ---
  const chimeRef = useRef(null);

  useEffect(() => {
    // Try autoplay immediately (works in some browsers/contexts)
    chimeRef.current?.play().catch(() => {
      // Blocked by browser — fallback below handles it
    });

    // Fallback: play on first user interaction anywhere on the page
    const playOnce = () => {
      chimeRef.current?.play();
      document.removeEventListener("click", playOnce);
    };
    document.addEventListener("click", playOnce);
    return () => document.removeEventListener("click", playOnce);
  }, []);
  // --- End welcome chime ---

  const [tableName, setTableName] = useState(null);
  const [schema, setSchema] = useState(null);
  const [rowCount, setRowCount] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState(null);
  const [results, setResults] = useState(null);
  const [askError, setAskError] = useState(null);
  const [asking, setAsking] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setQuestion(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current || asking || !tableName) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setAskError(null);
      setQuestion("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const doUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    setTableName(null);
    setSql(null);
    setResults(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTableName(res.data.table_name);
      setSchema(res.data.schema);
      setRowCount(res.data.row_count);
    } catch (err) {
      setUploadError(err.response?.data?.detail || "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    doUpload(e.dataTransfer.files[0]);
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim() || !tableName) return;
    setAsking(true);
    setAskError(null);
    setSql(null);
    setResults(null);

    try {
      const res = await axios.post(`${API_BASE}/ask`, {
        table_name: tableName,
        question,
      });
      setSql(res.data.sql);
      setResults(res.data.results);
    } catch (err) {
      setAskError(err.response?.data?.detail || "Something went wrong. Try again.");
    } finally {
      setAsking(false);
    }
  };

  const columns = results && results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <audio ref={chimeRef} src={chimeSound} />

      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      <Hero />

      <div id="home" className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center gap-2 mb-8 sm:mb-10">
          <span className="text-[var(--accent)] font-['JetBrains_Mono'] text-sm">{'>'}</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl tracking-tight">
            Run it yourself
          </h2>
        </div>

        <div className="relative flex flex-col gap-8 sm:gap-10">
          <div className="absolute left-[15px] sm:left-[17px] top-9 bottom-9 w-px bg-[var(--border)]" />

          <Step number="1" title="Upload your data" active={!tableName} done={!!tableName}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-xl border border-dashed p-4 sm:p-6 cursor-pointer transition-all ${
                dragOver
                  ? "border-[var(--accent)] bg-[var(--accent-dim)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) => doUpload(e.target.files[0])}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] font-['JetBrains_Mono'] text-xs shrink-0">
                  CSV
                </div>
                <div className="text-sm min-w-0">
                  <p className="text-[var(--text)] break-words">
                    {uploading ? "Uploading..." : "Drop a CSV here, or click to browse"}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">Max file size applies</p>
                </div>
              </div>
            </div>

            {uploadError && (
              <p className="text-sm text-red-400 mt-3 font-['JetBrains_Mono']">{uploadError}</p>
            )}

            {tableName && (
              <div className="animate-in mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-['JetBrains_Mono'] text-xs">
                <div className="flex justify-between text-[var(--text-muted)] mb-1">
                  <span>table</span>
                  <span className="text-[var(--accent)]">{tableName}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)] mb-2">
                  <span>rows</span>
                  <span className="text-[var(--text)]">{rowCount}</span>
                </div>
                <div className="text-[var(--text-muted)] break-all leading-relaxed border-t border-[var(--border)] pt-2">
                  {schema}
                </div>
              </div>
            )}
          </Step>

          <Step number="2" title="Ask a question" active={!!tableName && !sql} done={!!sql}>
            <form onSubmit={handleAsk} className="relative">
              <div
                className={`flex items-center gap-2 rounded-xl border bg-[var(--surface)] px-3 sm:px-4 py-2.5 sm:py-3 transition-colors ${
                  tableName ? "border-[var(--border)] focus-within:border-[var(--accent)]" : "border-[var(--border)] opacity-50"
                }`}
              >
                <span className="text-[var(--accent)] font-['JetBrains_Mono'] text-sm shrink-0">{'>'}</span>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={!tableName || asking}
                  placeholder={isListening ? "Listening..." : "Ask your data anything"}
                  className="flex-1 min-w-0 bg-transparent outline-none text-sm font-['JetBrains_Mono'] placeholder:text-[var(--text-muted)]"
                />
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    disabled={!tableName || asking}
                    title={isListening ? "Stop listening" : "Ask by voice"}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors disabled:opacity-40 ${
                      isListening
                        ? "border-red-400 text-red-400 animate-pulse"
                        : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!tableName || asking || !question.trim()}
                  className="shrink-0 text-xs font-['Space_Grotesk'] font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[#0A0A0A] disabled:bg-[var(--border)] disabled:text-[var(--text-muted)] transition-colors"
                >
                  {asking ? "Running" : "Run"}
                </button>
              </div>
            </form>
            {askError && (
              <p className="text-sm text-red-400 mt-3 font-['JetBrains_Mono']">{askError}</p>
            )}
            {!voiceSupported && (
              <p className="text-[var(--text-muted)] text-xs mt-2 font-['JetBrains_Mono']">
                Voice input isn't supported in this browser — try Chrome or Edge.
              </p>
            )}
            {asking && (
              <div className="flex gap-1 mt-3 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            )}
          </Step>

          {sql && (
            <Step number="3" title="Result" done>
              <div className="animate-in rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-hover)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--border-hover)]" />
                  <span className="text-[var(--text-muted)] text-xs font-['JetBrains_Mono'] ml-2">generated.sql</span>
                </div>
                <pre className="animate-type font-['JetBrains_Mono'] text-xs text-[var(--accent)] p-4 overflow-x-auto whitespace-pre-wrap">
                  {sql}
                </pre>

                {results && results.length > 0 ? (
                  <div className="overflow-x-auto border-t border-[var(--border)]">
                    <table className="min-w-full text-xs font-['JetBrains_Mono']">
                      <thead>
                        <tr className="bg-[var(--surface-hover)]">
                          {columns.map((col) => (
                            <th key={col} className="text-left px-4 py-2 text-[var(--text-muted)] font-medium border-b border-[var(--border)] whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((row, i) => (
                          <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-hover)] transition-colors">
                            {columns.map((col) => (
                              <td key={col} className="px-4 py-2 text-[var(--text)] whitespace-nowrap">
                                {String(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)] text-xs font-['JetBrains_Mono'] p-4 border-t border-[var(--border)]">
                    No rows returned.
                  </p>
                )}
              </div>
            </Step>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;