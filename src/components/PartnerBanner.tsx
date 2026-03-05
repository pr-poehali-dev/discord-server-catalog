import { useState, useEffect } from "react";

const SERVERS = [
  { name: "MIKU Community", tag: "MIKU", members: "241 911", color: "#00d4ff", emoji: "💙", invite: "https://discord.gg/miku", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/85cd9d82-6cf3-4959-88f7-38678b62abec.png" },
  { name: "YAOI Community",  tag: "YAOI", members: "188 442", color: "#ff6eb4", emoji: "💗", invite: "https://discord.gg/yaoi", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/3862d535-df6e-4574-b619-c1a0dc44360b.png" },
  { name: "YURI Community",  tag: "YURI", members: "143 514", color: "#c084fc", emoji: "💜", invite: "https://discord.gg/yuri", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/d025ac2b-eaa5-4f74-baaa-573b744b6c24.png" },
  { name: "TETO Community",  tag: "TETO", members: "70 742",  color: "#f87171", emoji: "❤️", invite: "https://discord.gg/teto", icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/faf70b41-3eff-4902-913b-a7b8e1094f7f.png" },
];

function getNextFridayMs() {
  const now = new Date();
  const diff = (5 - now.getDay() + 7) % 7 || 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + diff);
  friday.setHours(18, 0, 0, 0);
  return friday.getTime();
}

const FRIDAY_MS = getNextFridayMs();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function PartnerBanner() {
  const [active, setActive] = useState(0);
  const [remaining, setRemaining] = useState(() => Math.max(0, FRIDAY_MS - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, FRIDAY_MS - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SERVERS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const s = SERVERS[active];
  const totalSec = Math.floor(remaining / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return (
    <div style={{ maxWidth: 672, margin: "20px auto 16px", padding: "0 12px" }}>
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#2b2d31",
        padding: "12px 14px 10px",
      }}>

        {/* Glow */}
        <div style={{
          position: "absolute",
          top: -60, right: -60,
          width: 180, height: 180,
          borderRadius: "50%",
          background: s.color,
          opacity: 0.07,
          filter: "blur(40px)",
          pointerEvents: "none",
          transition: "background 0.6s ease",
        }} />

        {/* Top: label + dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#80848e" }}>
            ⚡ Powered by
          </span>
          <div style={{ display: "flex", gap: 5 }}>
            {SERVERS.map((srv, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: i === active ? srv.color : "rgba(255,255,255,0.2)",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Server row */}
        <div style={{ marginBottom: 8 }}>
          <a
            href={s.invite}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", borderRadius: 8, padding: "4px 2px" }}
          >
            <img
              src={s.icon}
              alt={s.name}
              style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${s.color}`, transition: "border-color 0.5s ease" }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#dbdee1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {s.emoji} {s.name}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#80848e", marginTop: 1 }}>
                {s.members} участников · #{s.tag} TAG
              </div>
            </div>
            <div style={{ flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, color: "#fff", padding: "5px 12px", borderRadius: 6, background: s.color, whiteSpace: "nowrap", transition: "background 0.5s ease" }}>
              Перейти
            </div>
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: 1, margin: "0 -14px 8px", background: `linear-gradient(90deg, transparent, ${s.color}44, transparent)`, transition: "background 0.6s ease" }} />

        {/* Friday promo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#dbdee1", marginBottom: 2 }}>
              🎉 Пятничный розыгрыш
            </div>
            <div style={{ fontSize: "0.7rem", color: "#80848e", lineHeight: 1.4 }}>
              Каждую пятницу сервер из каталога рекламируется на 4 серверах с пингом{" "}
              <span style={{ background: "rgba(88,101,242,0.25)", color: "#8891f7", borderRadius: 3, padding: "0 3px", fontWeight: 600 }}>
                @everyone
              </span>
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div style={{ fontSize: "0.62rem", color: "#80848e", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
              До розыгрыша
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: s.color, fontFamily: "'IBM Plex Mono', monospace", transition: "color 0.6s ease" }}>
              {days > 0 && <span>{days}д </span>}
              {pad(hours)}:{pad(mins)}:{pad(secs)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
