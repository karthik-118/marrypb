import { config } from "@/lib/config";
import Reveal from "./Reveal";
import { OrnamentDivider } from "./Decorations";

export default function Location() {
  const { location, wedding } = config;

  return (
    <section className="section location" id="location">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">We can't wait to see you</span>
          <h2 className="section-title">The Venue</h2>
          <OrnamentDivider style={{ width: 220, color: "#c9a227" }} />
        </Reveal>

        <Reveal className="location-card">
          <div className="location-info">
            <h3 className="venue-name">{location.venueName}</h3>
            <p className="venue-address">{location.address}</p>
            <p className="venue-when">
              {wedding.dateDisplay} · {wedding.timeDisplay}
            </p>
            <a
              className="btn"
              href={location.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions →
            </a>
          </div>
          <div className="location-map">
            <iframe
              src={location.mapEmbedSrc}
              title={`Map to ${location.venueName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
