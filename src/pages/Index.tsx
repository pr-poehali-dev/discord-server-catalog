import { useState } from "react";
import Icon from "@/components/ui/icon";

const MOCK_SERVERS = [
  { id: "1", tag: "MIKU", badge: "💙", name: "miqua🌙 ✦ daecor (つωつ", invite: "https://discord.gg/miku", serverId: "1209990541960006928" },
  { id: "2", tag: "MIKU", badge: "💙", name: "Miku Lovers Union", invite: "https://discord.gg/milku", serverId: "1217863153623794372" },
  { id: "3", tag: "MIKU", badge: "🍎", name: "Hatsune's Habitator (習慣)", invite: "https://discord.gg/hatsune", serverId: "9604463215362819591" },
  { id: "4", tag: "MIKU", badge: "💙", name: "unknown", invite: "https://discord.gg/miku4", serverId: "1385416680088952613" },
  { id: "5", tag: "MIKU", badge: "💙", name: "Miku's Tag Zone", invite: "https://discord.gg/miku5", serverId: "1628984206407231897" },
  { id: "6", tag: "MIKU", badge: "🍎", name: "unknown", invite: "https://discord.gg/miku6", serverId: "1175961094985613248" },
  { id: "7", tag: "MIKU", badge: "💙", name: "Miku's Party", invite: "https://discord.gg/miku7", serverId: "1187657049893706124" },
  { id: "8", tag: "MIKU", badge: "💙", name: "unknown", invite: "https://discord.gg/miku8", serverId: "1450424486983709696" },
  { id: "9", tag: "MIKU", badge: "💙", name: "silky classics🌙 ✦", invite: "https://discord.gg/miku9", serverId: "1190946213392362569" },
  { id: "10", tag: "MIKU", badge: "💙", name: "Miku Cult ×3", invite: "https://discord.gg/miku10", serverId: "753807374917619475" },
  { id: "11", tag: "MIKU", badge: "💙", name: "unknown", invite: "https://discord.gg/miku11", serverId: "9367268951788046223" },
  { id: "12", tag: "MIKU", badge: "💙", name: "MIKU Community", invite: "https://discord.gg/miku12", serverId: "1049481756178936735" },
  { id: "13", tag: "MIKU", badge: "🍎", name: "m1ku.egg", invite: "https://discord.gg/miku13", serverId: "1086224862854939843" },
  { id: "14", tag: "MIKU", badge: "💙", name: "unknown", invite: "https://discord.gg/miku14", serverId: "1367980726015219748" },
  { id: "15", tag: "DEV", badge: "⚙️", name: "DevHub — Programmers", invite: "https://discord.gg/devhub", serverId: "9923847561029384751" },
  { id: "16", tag: "DEV", badge: "⚙️", name: "Open Source RU", invite: "https://discord.gg/osru", serverId: "8812736450193847251" },
  { id: "17", tag: "ART", badge: "🎨", name: "ArtSpace Community", invite: "https://discord.gg/artspace", serverId: "7701234567890123456" },
  { id: "18", tag: "ART", badge: "🎨", name: "Digital Artists Guild", invite: "https://discord.gg/dag", serverId: "6601234567890123456" },
  { id: "19", tag: "GAME", badge: "🎮", name: "GG — Gamers", invite: "https://discord.gg/ggrus", serverId: "5512345678901234567" },
  { id: "20", tag: "GAME", badge: "🎮", name: "Indie Games RU", invite: "https://discord.gg/indiru", serverId: "4423456789012345678" },
  { id: "21", tag: "APLE", badge: "🍎", name: "[APLE] Apples 🍎", invite: "https://discord.gg/aple", serverId: "1370104280937402499" },
  { id: "22", tag: "TAGS", badge: "🌿", name: "Guild Tags | 40,000+ Tags", invite: "https://discord.gg/tags", serverId: "1369767412995457034" },
];

const TOTAL_TAGS = 61774;
const PER_PAGE = 10;

export default function Index() {
  const [search, setSearch] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [page, setPage] = useState(1);
  const [addSuccess, setAddSuccess] = useState(false);

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
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <span className="font-semibold text-sm tracking-wide" style={{ color: "var(--dc-text-primary)" }}>Guild Tags</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-10 pb-5 text-center animate-fade-in">
        <p className="text-sm" style={{ color: "var(--dc-text-muted)" }}>
          We are currently tracking over{" "}
          <span className="font-semibold" style={{ color: "var(--dc-text-primary)" }}>{TOTAL_TAGS.toLocaleString("en-US")}</span>{" "}
          tags. The largest tag directory on{" "}
          <span className="font-semibold" style={{ color: "#5865f2" }}>Discord</span>.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6">

        {/* Add server row */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div
              className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded"
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
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold transition-colors whitespace-nowrap"
              style={{ backgroundColor: "var(--dc-green)", color: "#fff" }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--dc-green-hover)")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-green)")}
            >
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
            className="flex items-center gap-3 px-4 py-2.5 rounded"
            style={{ backgroundColor: "var(--dc-bg-secondary)", border: "1px solid var(--dc-border)" }}
          >
            <Icon name="Search" size={15} style={{ color: "var(--dc-text-muted)", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search for tags, servers, or server IDs..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--dc-text-primary)" }}
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
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--dc-border)" }}>

            {/* Header */}
            <div
              className="grid text-xs font-bold uppercase tracking-wider px-5 py-3.5"
              style={{
                gridTemplateColumns: "56px 110px 1fr 140px 210px",
                backgroundColor: "var(--dc-bg-secondary)",
                color: "var(--dc-text-secondary)",
                borderBottom: "1px solid var(--dc-border)"
              }}
            >
              <span>Badge</span>
              <span>Tag</span>
              <span>Server</span>
              <span>Server Invite</span>
              <span>Server ID</span>
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
                  className="grid items-center px-5 transition-colors"
                  style={{
                    gridTemplateColumns: "56px 110px 1fr 140px 210px",
                    backgroundColor: "var(--dc-bg-tertiary)",
                    borderBottom: i < paginated.length - 1 ? "1px solid var(--dc-border-subtle)" : "none",
                    minHeight: "54px",
                    cursor: "default",
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)")}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-bg-tertiary)")}
                >
                  <span className="text-lg leading-none">{s.badge}</span>
                  <span
                    className="text-sm font-bold tracking-wide"
                    style={{ color: "var(--dc-text-primary)", fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.tag}
                  </span>
                  <span className="text-sm pr-4" style={{ color: "var(--dc-text-secondary)" }}>{s.name}</span>
                  <div>
                    <a
                      href={s.invite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded text-xs font-bold transition-colors"
                      style={{ backgroundColor: "var(--dc-green)", color: "#fff" }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--dc-green-hover)")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-green)")}
                    >
                      Join Guild
                    </a>
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--dc-text-muted)", fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {s.serverId}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-30"
                style={{ backgroundColor: "var(--dc-bg-secondary)", color: "var(--dc-text-secondary)", border: "1px solid var(--dc-border)" }}
              >
                <Icon name="ChevronLeft" size={13} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className="w-7 h-7 rounded text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: page === i + 1 ? "var(--dc-accent)" : "var(--dc-bg-secondary)",
                      color: page === i + 1 ? "#fff" : "var(--dc-text-muted)",
                      border: `1px solid ${page === i + 1 ? "var(--dc-accent)" : "var(--dc-border)"}`
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-30"
                style={{ backgroundColor: "var(--dc-bg-secondary)", color: "var(--dc-text-secondary)", border: "1px solid var(--dc-border)" }}
              >
                Next
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
