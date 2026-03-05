import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const BADGES = [
  "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/62f9f0bd-7ae0-4df5-bc99-86c7b18e5341.png",
  "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/6932da8b-e66a-4915-9b59-9f81000ea852.png",
  "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/b7a97fe2-02a8-4213-b883-83db38b74e2b.png",
];

const b = (n: number) => BADGES[n % BADGES.length];

const MOCK_SERVERS = [
  { id: "1",  tag: "MIKU", badge: b(0), name: "miqua🌙 ✦ daecor (つωつ",         invite: "https://discord.gg/miku",    serverId: "1209990541960006928" },
  { id: "2",  tag: "MIKU", badge: b(1), name: "Miku Lovers Union",                invite: "https://discord.gg/milku",   serverId: "1217863153623794372" },
  { id: "3",  tag: "MIKU", badge: b(2), name: "Hatsune's Habitator (習慣)",       invite: "https://discord.gg/hatsune", serverId: "9604463215362819591" },
  { id: "4",  tag: "MIKU", badge: b(0), name: "Miku's Tag Zone",                  invite: "https://discord.gg/miku5",   serverId: "1628984206407231897" },
  { id: "5",  tag: "MIKU", badge: b(2), name: "silky classics🌙 ✦",              invite: "https://discord.gg/miku9",   serverId: "1190946213392362569" },
  { id: "6",  tag: "MIKU", badge: b(1), name: "MIKU Community",                   invite: "https://discord.gg/miku12",  serverId: "1049481756178936735" },
  { id: "7",  tag: "APLE", badge: b(2), name: "[APLE] Apples 🍎",                 invite: "https://discord.gg/aple",    serverId: "1370104280937402499" },
  { id: "8",  tag: "APLE", badge: b(0), name: "Apple Orchard Community",          invite: "https://discord.gg/aple2",   serverId: "2281930482047193820" },
  { id: "9",  tag: "TAGS", badge: b(1), name: "Guild Tags | 40,000+ Tags",        invite: "https://discord.gg/tags",    serverId: "1369767412995457034" },
  { id: "10", tag: "TAGS", badge: b(2), name: "Tag Hunters Hub",                  invite: "https://discord.gg/tagh",    serverId: "3390124678234512345" },
  { id: "11", tag: "DEV",  badge: b(0), name: "DevHub — Programmers",             invite: "https://discord.gg/devhub",  serverId: "9923847561029384751" },
  { id: "12", tag: "DEV",  badge: b(1), name: "Open Source Builders",             invite: "https://discord.gg/osb",     serverId: "8812736450193847251" },
  { id: "13", tag: "DEV",  badge: b(2), name: "Backend Cafe",                     invite: "https://discord.gg/bkcafe", serverId: "7723456789012345678" },
  { id: "14", tag: "ART",  badge: b(0), name: "ArtSpace Community",               invite: "https://discord.gg/artsp",   serverId: "7701234567890123456" },
  { id: "15", tag: "ART",  badge: b(2), name: "Digital Artists Guild",            invite: "https://discord.gg/dag",     serverId: "6601234567890123456" },
  { id: "16", tag: "ART",  badge: b(1), name: "Pixel & Ink",                      invite: "https://discord.gg/pixink",  serverId: "5591234567890123456" },
  { id: "17", tag: "GAME", badge: b(0), name: "GG — Gamers",                      invite: "https://discord.gg/ggrus",   serverId: "5512345678901234567" },
  { id: "18", tag: "GAME", badge: b(2), name: "Indie Games Collective",            invite: "https://discord.gg/igc",     serverId: "4423456789012345678" },
  { id: "19", tag: "GAME", badge: b(1), name: "Retro Gamers Den",                 invite: "https://discord.gg/rgd",     serverId: "3334567890123456789" },
  { id: "20", tag: "MUSC", badge: b(0), name: "Music Producers Hub",              invite: "https://discord.gg/mph",     serverId: "2245678901234567890" },
  { id: "21", tag: "MUSC", badge: b(1), name: "Lo-fi & Chill Lounge",             invite: "https://discord.gg/lofi",    serverId: "1156789012345678901" },
  { id: "22", tag: "MUSC", badge: b(2), name: "Classical Music Society",          invite: "https://discord.gg/cms",     serverId: "9067890123456789012" },
  { id: "23", tag: "ANME", badge: b(0), name: "Anime World",                      invite: "https://discord.gg/anmew",   serverId: "8978901234567890123" },
  { id: "24", tag: "ANME", badge: b(2), name: "Shounen Brotherhood",              invite: "https://discord.gg/shbro",   serverId: "7889012345678901234" },
  { id: "25", tag: "ANME", badge: b(1), name: "Isekai Tavern",                    invite: "https://discord.gg/isekai",  serverId: "6790123456789012345" },
  { id: "26", tag: "FOTO", badge: b(0), name: "Photographers Guild",              invite: "https://discord.gg/pguild",  serverId: "5601234567890123456" },
  { id: "27", tag: "FOTO", badge: b(2), name: "Street Lens Collective",           invite: "https://discord.gg/slc",     serverId: "4512345678901234567" },
  { id: "28", tag: "LANG", badge: b(1), name: "Polyglot Cafe",                    invite: "https://discord.gg/poly",    serverId: "3423456789012345678" },
  { id: "29", tag: "LANG", badge: b(0), name: "English Practice Zone",            invite: "https://discord.gg/epz",     serverId: "2334567890123456789" },
  { id: "30", tag: "LANG", badge: b(2), name: "日本語 Learning Hub",              invite: "https://discord.gg/jpn",     serverId: "1245678901234567890" },
  { id: "31", tag: "CRPT", badge: b(1), name: "Crypto Talk Daily",                invite: "https://discord.gg/ctd",     serverId: "9156789012345678901" },
  { id: "32", tag: "CRPT", badge: b(0), name: "DeFi Explorers",                   invite: "https://discord.gg/defi",    serverId: "8067890123456789012" },
  { id: "33", tag: "SPRT", badge: b(2), name: "Football Fanatics",                invite: "https://discord.gg/ffan",    serverId: "6978901234567890123" },
  { id: "34", tag: "SPRT", badge: b(1), name: "Basketball Zone",                  invite: "https://discord.gg/bzone",   serverId: "5889012345678901234" },
  { id: "35", tag: "COOK", badge: b(0), name: "Chefs & Foodies",                  invite: "https://discord.gg/chefs",   serverId: "4790123456789012345" },
  { id: "36", tag: "COOK", badge: b(2), name: "Ramen Lovers Society",             invite: "https://discord.gg/rls",     serverId: "3601234567890123456" },
  { id: "37", tag: "TECH", badge: b(1), name: "Tech Enthusiasts",                 invite: "https://discord.gg/techenj", serverId: "2512345678901234567" },
  { id: "38", tag: "TECH", badge: b(0), name: "AI & Machine Learning Hub",        invite: "https://discord.gg/aiml",    serverId: "1423456789012345678" },
  { id: "39", tag: "TECH", badge: b(2), name: "Cybersecurity Guild",              invite: "https://discord.gg/csg",     serverId: "9334567890123456789" },
  { id: "40", tag: "VIBE", badge: b(1), name: "Good Vibes Only",                  invite: "https://discord.gg/gvo",     serverId: "8245678901234567890" },
  { id: "41", tag: "VIBE", badge: b(0), name: "Chill Zone Central",               invite: "https://discord.gg/czc",     serverId: "7156789012345678901" },
  { id: "42", tag: "BOOK", badge: b(2), name: "Book Club Universe",               invite: "https://discord.gg/bcu",     serverId: "6067890123456789012" },
  { id: "43", tag: "BOOK", badge: b(1), name: "Fantasy Readers Circle",           invite: "https://discord.gg/frc",     serverId: "4978901234567890123" },
  { id: "44", tag: "FILM", badge: b(0), name: "Cinema Discourse",                 invite: "https://discord.gg/cind",    serverId: "3889012345678901234" },
  { id: "45", tag: "FILM", badge: b(2), name: "Movie Night Every Day",            invite: "https://discord.gg/mned",    serverId: "2790123456789012345" },
];


const TOTAL_TAGS = 61774;
const PER_PAGE = 10;

const PARTNER_SERVERS = [
  { name: "MIKU Community", tag: "MIKU", members: "241 911", color: "#00d4ff", emoji: "💙", invite: "https://discord.gg/miku", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/85cd9d82-6cf3-4959-88f7-38678b62abec.png" },
  { name: "YAOI Community",  tag: "YAOI", members: "188 442", color: "#ff6eb4", emoji: "💗", invite: "https://discord.gg/yaoi", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/3862d535-df6e-4574-b619-c1a0dc44360b.png" },
  { name: "YURI Community",  tag: "YURI", members: "143 514", color: "#c084fc", emoji: "💜", invite: "https://discord.gg/yuri", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/d025ac2b-eaa5-4f74-baaa-573b744b6c24.png" },
  { name: "TETO Community",  tag: "TETO", members: "70 742",  color: "#f87171", emoji: "❤️", invite: "https://discord.gg/teto", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/faf70b41-3eff-4902-913b-a7b8e1094f7f.png" },
];

export default function Index() {
  const [search, setSearch] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [page, setPage] = useState(1);
  const [addSuccess, setAddSuccess] = useState(false);
  const [partnerActive, setPartnerActive] = useState(0);
  const [countdown, setCountdown] = useState("--:--:--");

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerActive(a => (a + 1) % PARTNER_SERVERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = (5 - now.getDay() + 7) % 7 || 7;
      const friday = new Date(now);
      friday.setDate(now.getDate() + diff);
      friday.setHours(18, 0, 0, 0);
      const ms = Math.max(0, friday.getTime() - now.getTime());
      const totalSec = Math.floor(ms / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const ss = String(s).padStart(2, "0");
      setCountdown(d > 0 ? `${d}д ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = MOCK_SERVERS.filter(s => {
    const q = search.toLowerCase();
    return !q || s.tag.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.serverId.includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  const handleAdd = () => {
    if (!inviteInput.trim()) return;
    setAddSuccess(true);
    setInviteInput("");
    setTimeout(() => setAddSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dc-bg-primary)", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: "var(--dc-bg-secondary)", borderBottom: "1px solid var(--dc-border)" }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <span className="font-semibold text-sm tracking-wide" style={{ color: "var(--dc-text-primary)" }}>Guild Tags</span>
          </div>
        </div>
      </nav>

      {/* Partner Banner */}
      {(() => {
        const ps = PARTNER_SERVERS[partnerActive];
        return (
          <div style={{ maxWidth: 672, margin: "20px auto 0", padding: "0 12px" }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "#2b2d31", padding: "12px 14px 10px" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 180, height: 180, borderRadius: "50%", background: ps.color, opacity: 0.07, filter: "blur(40px)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#80848e" }}>⚡ Powered by</span>
                <div style={{ display: "flex", gap: 5 }}>
                  {PARTNER_SERVERS.map((srv, i) => (
                    <button key={i} onClick={() => setPartnerActive(i)} style={{ width: 6, height: 6, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0, background: i === partnerActive ? srv.color : "rgba(255,255,255,0.2)" }} />
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <a href={ps.invite} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", borderRadius: 8, padding: "4px 2px" }}>
                  <img src={ps.icon} alt={ps.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${ps.color}` }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#dbdee1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ps.emoji} {ps.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#80848e", marginTop: 1 }}>{ps.members} участников · #{ps.tag} TAG</div>
                  </div>
                  <div style={{ flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, color: "#fff", padding: "5px 12px", borderRadius: 6, background: ps.color, whiteSpace: "nowrap" }}>Перейти</div>
                </a>
              </div>
              <div style={{ height: 1, margin: "0 -14px 8px", background: `linear-gradient(90deg, transparent, ${ps.color}44, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#dbdee1", marginBottom: 2 }}>🎉 Пятничный розыгрыш</div>
                  <div style={{ fontSize: "0.7rem", color: "#80848e", lineHeight: 1.4 }}>
                    Каждую пятницу сервер из каталога рекламируется с пингом{" "}
                    <span style={{ background: "rgba(88,101,242,0.25)", color: "#8891f7", borderRadius: 3, padding: "0 3px", fontWeight: 600 }}>@everyone</span>
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" as const }}>
                  <div style={{ fontSize: "0.62rem", color: "#80848e", textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 2 }}>До розыгрыша</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: ps.color, fontFamily: "'IBM Plex Mono', monospace" }}>{countdown}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Hero */}
      <section className="pt-2 pb-4 text-center animate-fade-in px-4">
        <p className="hero-text text-sm" style={{ color: "var(--dc-text-muted)" }}>
          We are currently tracking over{" "}
          <span className="font-semibold" style={{ color: "var(--dc-text-primary)" }}>{TOTAL_TAGS.toLocaleString("en-US")}</span>{" "}
          tags. The largest tag directory on{" "}
          <span className="font-semibold" style={{ color: "#5865f2" }}>Discord</span>.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-3 sm:px-4">

        {/* Add server row */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div
              className="invite-input-wrap flex-1 flex items-center gap-2 px-4 py-2.5 rounded"
              style={{ backgroundColor: "var(--dc-bg-secondary)", border: "1px solid var(--dc-border)" }}
            >
              <input
                type="text"
                placeholder="Enter server invite code..."
                value={inviteInput}
                onChange={e => setInviteInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--dc-text-primary)" }}
              />
            </div>
            <button onClick={handleAdd} className="add-btn">
              <Icon name="Plus" size={15} />
              Add
            </button>
          </div>
          {addSuccess && (
            <p className="text-xs mt-2 animate-fade-in" style={{ color: "var(--dc-green)" }}>
              ✓ Your server has been submitted for review!
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mb-3">
          <div
            className="search-input flex items-center gap-3 px-4 py-2.5 rounded"
            style={{ backgroundColor: "var(--dc-bg-secondary)", border: "1px solid var(--dc-border)" }}
          >
            <Icon name="Search" size={16} style={{ color: "var(--dc-text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search for tags, servers, or server IDs..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ color: "var(--dc-text-primary)", fontSize: "inherit" }}
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }} style={{ color: "var(--dc-text-muted)" }}>
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <section className="mb-12 animate-fade-in">
          {search && (
            <p className="text-xs mb-2" style={{ color: "var(--dc-text-muted)" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for <span style={{ color: "var(--dc-text-secondary)" }}>"{search}"</span>
            </p>
          )}
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--dc-border)" }}>

            {/* Header */}
            <div
              className="table-header grid text-xs font-bold uppercase tracking-wider px-4 py-3"
              style={{
                gridTemplateColumns: "44px 90px 1fr 110px",
                backgroundColor: "var(--dc-bg-secondary)",
                color: "var(--dc-text-muted)",
                borderBottom: "1px solid var(--dc-border)"
              }}
            >
              <span>Badge</span>
              <span>Tag</span>
              <span>Server Name</span>
              <span>Invite</span>
            </div>

            {/* Rows */}
            {paginated.length === 0 ? (
              <div className="py-16 text-center" style={{ backgroundColor: "var(--dc-bg-tertiary)", color: "var(--dc-text-muted)" }}>
                <Icon name="SearchX" size={28} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No servers found</p>
              </div>
            ) : (
              paginated.map((s, i) => (
                <div
                  key={s.id}
                  className="server-row grid items-center px-4"
                  style={{
                    gridTemplateColumns: "44px 90px 1fr 110px",
                    backgroundColor: "var(--dc-bg-tertiary)",
                    borderBottom: i < paginated.length - 1 ? "1px solid var(--dc-border-subtle)" : "none",
                    minHeight: "52px",
                  }}
                >
                  <img src={s.badge} alt="badge" className="col-badge w-8 h-8 object-contain" style={{ imageRendering: "pixelated" }} />
                  <span
                    className="col-tag font-bold tracking-wider"
                    style={{ color: "var(--dc-text-primary)", fontSize: "0.9rem" }}
                  >
                    {s.tag}
                  </span>
                  <span className="col-name text-sm pr-3 truncate" style={{ color: "var(--dc-text-muted)" }}>{s.name}</span>
                  <div className="col-invite">
                    <a href={s.invite} target="_blank" rel="noopener noreferrer" className="join-btn">
                      Join Guild
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium disabled:opacity-30"
                style={{ backgroundColor: "var(--dc-bg-secondary)", color: "var(--dc-text-secondary)", border: "1px solid var(--dc-border)", transition: "opacity 0.1s" }}
              >
                <Icon name="ChevronLeft" size={13} />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className="w-7 h-7 rounded text-xs font-medium"
                    style={{
                      backgroundColor: page === i + 1 ? "var(--dc-accent)" : "var(--dc-bg-secondary)",
                      color: page === i + 1 ? "#fff" : "var(--dc-text-muted)",
                      border: `1px solid ${page === i + 1 ? "var(--dc-accent)" : "var(--dc-border)"}`,
                      transition: "background-color 0.1s, color 0.1s",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium disabled:opacity-30"
                style={{ backgroundColor: "var(--dc-bg-secondary)", color: "var(--dc-text-secondary)", border: "1px solid var(--dc-border)", transition: "opacity 0.1s" }}
              >
                <span className="hidden sm:inline">Next</span>
                <Icon name="ChevronRight" size={13} />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs" style={{ color: "var(--dc-text-muted)" }}>
        <p>© 2026 Guild Tags. All rights reserved.</p>
        <p className="mt-1 opacity-50">This site is not affiliated with Discord Inc.</p>
      </footer>
    </div>
  );
}