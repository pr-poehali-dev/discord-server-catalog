import { useState } from "react";
import Icon from "@/components/ui/icon";

const MOCK_SERVERS = [
  { id: "1", tag: "miku", badge: "💙", server: "miku", name: "miqua🌙 ✦ daecor  (つωつ", invite: "https://discord.gg/miku", serverId: "1209990541960006928" },
  { id: "2", tag: "miku", badge: "💙", server: "Miku", name: "Miku Lovers Union", invite: "https://discord.gg/milku", serverId: "1217863153623794372" },
  { id: "3", tag: "Miku", badge: "🍎", server: "Miku", name: "Hatsune's Habitator (習慣)", invite: "https://discord.gg/hatsune", serverId: "9604463215362819591" },
  { id: "4", tag: "MIKU", badge: "💙", server: "Miku", name: "unknown", invite: "https://discord.gg/miku4", serverId: "1385416680088952613" },
  { id: "5", tag: "MIKU", badge: "💙", server: "Miku", name: "Miku's Tag Zone", invite: "https://discord.gg/miku5", serverId: "1628984206407231897" },
  { id: "6", tag: "MIKU", badge: "🍎", server: "Miku", name: "unknown", invite: "https://discord.gg/miku6", serverId: "1175961094985613248" },
  { id: "7", tag: "MIKU", badge: "💙", server: "Miku", name: "Miku's Party", invite: "https://discord.gg/miku7", serverId: "1187657049893706124" },
  { id: "8", tag: "MIKU", badge: "💙", server: "Miku", name: "unknown", invite: "https://discord.gg/miku8", serverId: "1450424486983709696" },
  { id: "9", tag: "MIKU", badge: "💙", server: "Miku", name: "silky classics🌙 ✦", invite: "https://discord.gg/miku9", serverId: "1190946213392362569" },
  { id: "10", tag: "MIKU", badge: "💙", server: "Miku", name: "Miku Cult ×3", invite: "https://discord.gg/miku10", serverId: "753807374917619475" },
  { id: "11", tag: "MIKU", badge: "💙", server: "Miku", name: "unknown", invite: "https://discord.gg/miku11", serverId: "9367268951788046223" },
  { id: "12", tag: "MIKU", badge: "💙", server: "Miku", name: "MIKU Community", invite: "https://discord.gg/miku12", serverId: "1049481756178936735" },
  { id: "13", tag: "MIKU", badge: "🍎", server: "Miku", name: "m1ku.egg", invite: "https://discord.gg/miku13", serverId: "1086224862854939843" },
  { id: "14", tag: "MIKU", badge: "💙", server: "Miku", name: "unknown", invite: "https://discord.gg/miku14", serverId: "1367980726015219748" },
  { id: "15", tag: "dev", badge: "⚙️", server: "DevHub", name: "DevHub — программисты", invite: "https://discord.gg/devhub", serverId: "9923847561029384751" },
  { id: "16", tag: "dev", badge: "⚙️", server: "Code", name: "Open Source RU", invite: "https://discord.gg/osru", serverId: "8812736450193847251" },
  { id: "17", tag: "art", badge: "🎨", server: "ArtSpace", name: "ArtSpace Community", invite: "https://discord.gg/artspace", serverId: "7701234567890123456" },
  { id: "18", tag: "art", badge: "🎨", server: "Draw", name: "Digital Artists Guild", invite: "https://discord.gg/dag", serverId: "6601234567890123456" },
  { id: "19", tag: "game", badge: "🎮", server: "GG", name: "GG — Геймеры России", invite: "https://discord.gg/ggrus", serverId: "5512345678901234567" },
  { id: "20", tag: "game", badge: "🎮", server: "GAME", name: "Indie Games RU", invite: "https://discord.gg/indiru", serverId: "4423456789012345678" },
];

const TAGS_LIST = [...new Set(MOCK_SERVERS.map(s => s.tag))];
const TOTAL_TAGS = 61774;
const PER_PAGE = 10;

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ tag: "", serverName: "", inviteCode: "", serverId: "" });
  const [addSuccess, setAddSuccess] = useState(false);

  const filtered = MOCK_SERVERS.filter(s => {
    const q = search.toLowerCase();
    return (
      (!activeTag || s.tag.toLowerCase() === activeTag.toLowerCase()) &&
      (!q || s.tag.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.server.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
    setActiveTag("");
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag("");
      setSearch("");
    } else {
      setActiveTag(tag);
      setSearch(tag);
    }
    setPage(1);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddSuccess(true);
    setTimeout(() => {
      setShowAddModal(false);
      setAddSuccess(false);
      setAddForm({ tag: "", serverName: "", inviteCode: "", serverId: "" });
    }, 1800);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dc-bg-primary)", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: "var(--dc-bg-secondary)", borderBottom: "1px solid var(--dc-border)" }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏷️</span>
            <span className="font-semibold text-base" style={{ color: "var(--dc-text-primary)" }}>Guild Tags</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--dc-green)", color: "#fff" }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--dc-green-hover)")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-green)")}
            >
              <Icon name="Plus" size={14} />
              Добавить сервер
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-14 text-center animate-fade-in">
        <p className="text-base mb-1" style={{ color: "var(--dc-text-muted)" }}>
          Мы отслеживаем{" "}
          <span className="font-semibold" style={{ color: "var(--dc-accent)" }}>{TOTAL_TAGS.toLocaleString("ru-RU")}</span>{" "}
          тегов. Крупнейший каталог тегов на{" "}
          <span className="font-semibold" style={{ color: "#5865f2" }}>Discord</span>.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--dc-text-muted)" }}>
          Найди сервер по тегу или добавь свой
        </p>

        {/* Search */}
        <div className="flex items-center justify-center gap-2 max-w-lg mx-auto px-4">
          <div className="flex-1 flex items-center rounded gap-2 px-3 py-2" style={{ backgroundColor: "var(--dc-bg-input)", border: "1px solid var(--dc-border)" }}>
            <Icon name="Search" size={15} style={{ color: "var(--dc-text-muted)" }} />
            <input
              type="text"
              placeholder="Введите тег сервера..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--dc-text-primary)" }}
            />
          </div>
        </div>
      </section>

      {/* Tags cloud */}
      <section className="max-w-5xl mx-auto px-6 mb-8">
        <p className="text-xs mb-3 font-medium uppercase tracking-widest" style={{ color: "var(--dc-text-muted)" }}>Популярные теги</p>
        <div className="flex flex-wrap gap-2">
          {TAGS_LIST.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded text-xs font-mono font-medium transition-all"
              style={{
                backgroundColor: activeTag === tag ? "var(--dc-accent)" : "var(--dc-bg-secondary)",
                color: activeTag === tag ? "#fff" : "var(--dc-text-secondary)",
                border: `1px solid ${activeTag === tag ? "var(--dc-accent)" : "var(--dc-border)"}`,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="max-w-5xl mx-auto px-6 mb-12 animate-fade-in">
        {search && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded" style={{ backgroundColor: "var(--dc-bg-secondary)", border: "1px solid var(--dc-border)" }}>
            <Icon name="Search" size={14} style={{ color: "var(--dc-text-muted)" }} />
            <span className="text-sm font-mono" style={{ color: "var(--dc-text-secondary)" }}>{search}</span>
            <button onClick={() => { setSearch(""); setActiveTag(""); setPage(1); }} className="ml-auto" style={{ color: "var(--dc-text-muted)" }}>
              <Icon name="X" size={14} />
            </button>
          </div>
        )}

        <div className="rounded overflow-hidden" style={{ border: "1px solid var(--dc-border)" }}>
          {/* Table header */}
          <div className="grid text-xs font-medium uppercase tracking-wider px-4 py-2.5"
            style={{
              gridTemplateColumns: "40px 80px 1fr 110px 160px",
              backgroundColor: "var(--dc-bg-secondary)",
              color: "var(--dc-text-muted)",
              borderBottom: "1px solid var(--dc-border)"
            }}>
            <span>Знак</span>
            <span>Тег</span>
            <span>Сервер</span>
            <span>Инвайт</span>
            <span>ID сервера</span>
          </div>

          {/* Rows */}
          {paginated.length === 0 ? (
            <div className="py-16 text-center" style={{ color: "var(--dc-text-muted)", backgroundColor: "var(--dc-bg-tertiary)" }}>
              <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">Серверов не найдено</p>
            </div>
          ) : (
            paginated.map((s, i) => (
              <div
                key={s.id}
                className="grid items-center px-4 py-3 text-sm transition-colors"
                style={{
                  gridTemplateColumns: "40px 80px 1fr 110px 160px",
                  backgroundColor: i % 2 === 0 ? "var(--dc-bg-tertiary)" : "var(--dc-bg-secondary)",
                  borderBottom: i < paginated.length - 1 ? "1px solid var(--dc-border-subtle)" : "none",
                  color: "var(--dc-text-primary)"
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(88,101,242,0.07)")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--dc-bg-tertiary)" : "var(--dc-bg-secondary)")}
              >
                <span className="text-base">{s.badge}</span>
                <span className="font-mono text-xs font-medium" style={{ color: "var(--dc-accent)" }}>{s.tag}</span>
                <span style={{ color: "var(--dc-text-primary)" }}>{s.name}</span>
                <a
                  href={s.invite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1 rounded text-xs font-medium w-fit transition-colors"
                  style={{ backgroundColor: "var(--dc-green)", color: "#fff" }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--dc-green-hover)")}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-green)")}
                >
                  Вступить
                </a>
                <span className="font-mono text-xs" style={{ color: "var(--dc-text-muted)" }}>{s.serverId}</span>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-30"
              style={{ backgroundColor: "var(--dc-bg-secondary)", color: "var(--dc-text-secondary)", border: "1px solid var(--dc-border)" }}
            >
              <Icon name="ChevronLeft" size={13} />
              Назад
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
              Далее
              <Icon name="ChevronRight" size={13} />
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs" style={{ color: "var(--dc-text-muted)" }}>
        <p>© 2026 Guild Tags. Все права защищены.</p>
        <p className="mt-1 opacity-60">Этот сайт не является аффилированным с Discord Inc.</p>
      </footer>

      {/* Add modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={e => { if (e.target === e.currentTarget) setShowAddModal(false); }}
        >
          <div
            className="w-full max-w-md rounded-lg p-6 animate-scale-in"
            style={{ backgroundColor: "var(--dc-bg-secondary)", border: "1px solid var(--dc-border)" }}
          >
            {addSuccess ? (
              <div className="text-center py-6 animate-fade-in">
                <span className="text-4xl mb-3 block">✅</span>
                <p className="font-semibold" style={{ color: "var(--dc-text-primary)" }}>Заявка отправлена!</p>
                <p className="text-sm mt-1" style={{ color: "var(--dc-text-muted)" }}>Мы рассмотрим её в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-base" style={{ color: "var(--dc-text-primary)" }}>Добавить свой тег</h2>
                  <button onClick={() => setShowAddModal(false)} style={{ color: "var(--dc-text-muted)" }}>
                    <Icon name="X" size={18} />
                  </button>
                </div>
                <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
                  {[
                    { label: "Тег сервера", key: "tag", placeholder: "например: MIKU" },
                    { label: "Название сервера", key: "serverName", placeholder: "Имя вашего сервера" },
                    { label: "Код инвайта", key: "inviteCode", placeholder: "discord.gg/xxx" },
                    { label: "ID сервера", key: "serverId", placeholder: "1234567890123456789" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--dc-text-secondary)" }}>
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={addForm[field.key as keyof typeof addForm]}
                        onChange={e => setAddForm(f => ({ ...f, [field.key]: e.target.value }))}
                        required
                        className="w-full px-3 py-2 rounded text-sm outline-none transition-colors"
                        style={{
                          backgroundColor: "var(--dc-bg-input)",
                          border: "1px solid var(--dc-border)",
                          color: "var(--dc-text-primary)"
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--dc-accent)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--dc-border)")}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded text-sm font-medium mt-1 transition-colors"
                    style={{ backgroundColor: "var(--dc-accent)", color: "#fff" }}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "var(--dc-accent-hover)")}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = "var(--dc-accent)")}
                  >
                    Отправить заявку
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
