import { config } from "@/lib/config";
import Reveal from "./Reveal";
import { EventIcon, OrnamentDivider } from "./Decorations";

export default function Events() {
  return (
    <section className="section events" id="events">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Join the celebrations</span>
          <h2 className="section-title">Wedding Events</h2>
          <OrnamentDivider style={{ width: 220, color: "#c9a227" }} />
          <p className="section-subtitle">
            A joyful few days of rituals, colour and celebration — we would love
            to have you with us at each one.
          </p>
        </Reveal>

        <div className="events-grid">
          {config.events.map((ev, i) => (
            <Reveal key={ev.name + i} className="event-card" delay={i * 90}>
              <div className="event-icon">
                <EventIcon name={ev.icon} />
              </div>
              <h3 className="event-name">{ev.name}</h3>
              <p className="event-meta">
                {ev.date}
                {ev.time ? ` · ${ev.time}` : ""}
              </p>
              {ev.venue ? <p className="event-venue">{ev.venue}</p> : null}
              {ev.note ? <p className="event-note">{ev.note}</p> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
