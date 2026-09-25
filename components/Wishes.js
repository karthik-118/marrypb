"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { OrnamentDivider } from "./Decorations";
import PetalBurst from "./PetalBurst";

const LOCAL_KEY = "wedding_wishes";

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export default function Wishes() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState([]);
  const [status, setStatus] = useState({ text: "", type: "" });
  const [sending, setSending] = useState(false);
  const [usingLocal, setUsingLocal] = useState(false);
  const btnRef = useRef(null);
  const [burst, setBurst] = useState({ runId: 0, origin: null });

  const celebrate = () => {
    const el = btnRef.current;
    let origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if (el) {
      const r = el.getBoundingClientRect();
      origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    setBurst((b) => ({ runId: b.runId + 1, origin }));
  };

  // Load wishes on mount (from the database if configured, else from this browser)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/wishes", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.configured) {
          setUsingLocal(false);
          setWishes(data.wishes || []);
        } else {
          setUsingLocal(true);
          setWishes(readLocal());
        }
      } catch {
        if (cancelled) return;
        setUsingLocal(true);
        setWishes(readLocal());
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();
    if (!trimmedName || !trimmedMsg) {
      setStatus({ text: "Please add your name and a wish.", type: "err" });
      return;
    }
    setSending(true);
    setStatus({ text: "", type: "" });
    celebrate();

    const newWish = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      message: trimmedMsg,
      created_at: new Date().toISOString(),
    };

    if (usingLocal) {
      const updated = [newWish, ...wishes];
      setWishes(updated);
      writeLocal(updated);
      setName("");
      setMessage("");
      setStatus({
        text: "Thank you! Your wish is saved on this device 💛",
        type: "ok",
      });
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: trimmedMsg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setWishes((w) => [data.wish, ...w]);
      setName("");
      setMessage("");
      setStatus({ text: "Thank you for your beautiful wish! 💛", type: "ok" });
    } catch (err) {
      setStatus({
        text: "Could not send right now — please try again.",
        type: "err",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section wishes" id="wishes">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Bless the couple</span>
          <h2 className="section-title">Send Your Wishes</h2>
          <OrnamentDivider style={{ width: 220, color: "#c9a227" }} />
          <p className="section-subtitle">
            Leave a note of love and blessings for the couple — it will mean the
            world to us.
          </p>
        </Reveal>

        <div className="wishes-layout">
          <Reveal className="wish-form-card">
            <h3>Leave a Blessing</h3>
            <p className="hint">Your warm words become a keepsake we'll treasure.</p>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="wish-name">Your Name</label>
                <input
                  id="wish-name"
                  type="text"
                  value={name}
                  maxLength={60}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                />
              </div>
              <div className="field">
                <label htmlFor="wish-msg">Your Wish</label>
                <textarea
                  id="wish-msg"
                  rows={4}
                  value={message}
                  maxLength={500}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Wishing you a lifetime of love and happiness…"
                />
              </div>
              <button ref={btnRef} className="btn btn-gold" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send Wish"}
              </button>
              <p className={`wish-status ${status.type}`}>{status.text}</p>
            </form>
          </Reveal>

          <div>
            <p className="wishes-count">
              {wishes.length} {wishes.length === 1 ? "Wish" : "Wishes"}
              {usingLocal ? (
                <span className="local-badge" title="Wishes are saved in your browser until a database is connected">
                  saved on this device
                </span>
              ) : null}
            </p>
            {wishes.length === 0 ? (
              <p className="wishes-empty">
                Be the first to share a blessing for the couple.
              </p>
            ) : (
              <div className="wishes-list">
                {wishes.map((w) => (
                  <div className="wish-item" key={w.id}>
                    <p className="msg">“{w.message}”</p>
                    <p className="who">— {w.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <PetalBurst origin={burst.origin} runId={burst.runId} />
    </section>
  );
}
