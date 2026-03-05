import { useState, useEffect } from "react";

const SERVERS = [
  {
    name: "MIKU Community",
    tag: "MIKU",
    members: "241 911",
    icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/85cd9d82-6cf3-4959-88f7-38678b62abec.png",
    color: "#00d4ff",
    invite: "https://discord.gg/miku",
    emoji: "💙",
  },
  {
    name: "YAOI Community",
    tag: "YAOI",
    members: "188 442",
    icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/3862d535-df6e-4574-b619-c1a0dc44360b.png",
    color: "#ff6eb4",
    invite: "https://discord.gg/yaoi",
    emoji: "💗",
  },
  {
    name: "YURI Community",
    tag: "YURI",
    members: "143 514",
    icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/d025ac2b-eaa5-4f74-baaa-573b744b6c24.png",
    color: "#c084fc",
    invite: "https://discord.gg/yuri",
    emoji: "💜",
  },
  {
    name: "TETO Community",
    tag: "TETO",
    members: "70 742",
    icon: "https://cdn.poehali.dev/projects/cc4018f2-6167-4801-8617-92fa7ab11a28/bucket/faf70b41-3eff-4902-913b-a7b8e1094f7f.png",
    color: "#f87171",
    invite: "https://discord.gg/teto",
    emoji: "❤️",
  },
];

function getNextFriday() {
  const now = new Date();
  const day = now.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + diff);
  friday.setHours(18, 0, 0, 0);
  return friday;
}

function useCountdown(target: Date) {
  const calc = () => Math.max(0, target.getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const d = Math.floor(h / 24);
  const hh = h % 24;
  return { d, h: hh, m, s: sec };
}

export default function PartnerBanner() {
  const [active, setActive] = useState(0);
  const friday = getNextFriday();
  const { d, h, m, s } = useCountdown(friday);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % SERVERS.length), 3000);
    return () => clearInterval(id);
  }, []);

  const server = SERVERS[active];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="partner-banner max-w-2xl mx-auto px-3 sm:px-4 mt-5 mb-4">
      <div className="partner-card" style={{ "--accent": server.color } as React.CSSProperties}>

        {/* Glow background */}
        <div className="partner-glow" style={{ background: server.color }} />

        {/* Top row: powered by */}
        <div className="partner-top">
          <span className="partner-label">⚡ Powered by</span>
          <div className="partner-dots">
            {SERVERS.map((_, i) => (
              <button
                key={i}
                className="partner-dot"
                style={{ background: i === active ? SERVERS[i].color : "rgba(255,255,255,0.2)" }}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* Server preview */}
        <div className="partner-body">
          <a href={server.invite} target="_blank" rel="noopener noreferrer" className="partner-server-link">
            <img
              key={server.name}
              src={server.icon}
              alt={server.name}
              className="partner-icon partner-icon-anim"
            />
            <div className="partner-info">
              <div className="partner-name">{server.emoji} {server.name}</div>
              <div className="partner-meta">{server.members} участников · #{server.tag} TAG</div>
            </div>
            <div className="partner-join" style={{ background: server.color }}>
              Перейти
            </div>
          </a>
        </div>

        {/* Divider */}
        <div className="partner-divider" style={{ background: `linear-gradient(90deg, transparent, ${server.color}44, transparent)` }} />

        {/* Friday promo */}
        <div className="partner-promo">
          <div className="partner-promo-left">
            <div className="partner-promo-title">
              🎉 Пятничный розыгрыш
            </div>
            <div className="partner-promo-desc">
              Каждую пятницу случайный сервер из каталога бесплатно рекламируется на 4 серверах с пингом{" "}
              <span className="discord-mention">@everyone</span>
            </div>
          </div>
          <div className="partner-countdown">
            <div className="partner-countdown-label">До розыгрыша</div>
            <div className="partner-countdown-time" style={{ color: server.color }}>
              {d > 0 && <><span>{d}д</span> </>}
              <span>{pad(h)}</span>
              <span className="partner-colon">:</span>
              <span>{pad(m)}</span>
              <span className="partner-colon">:</span>
              <span>{pad(s)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}