import { config, coupleNames } from "@/lib/config";
import { Ganesha } from "./Decorations";

export default function Footer() {
  const { couple, contact } = config;

  return (
    <footer className="footer">
      <Ganesha
        style={{
          width: 78,
          margin: "0 auto 18px",
          color: "#c9a227",
          opacity: 0.9,
        }}
      />
      <div className="container">
        <p className="footer-names font-display">{coupleNames()}</p>
        {couple.blessing ? (
          <p className="footer-blessing font-deva">{couple.blessing}</p>
        ) : null}

        <p className="footer-thanks">
          With gratitude and love, we thank you for being part of our journey.
        </p>

        {(contact.phone || contact.email || contact.rsvpNote) && (
          <div className="footer-contact">
            {contact.rsvpNote ? <span>{contact.rsvpNote}</span> : null}
            {contact.phone ? (
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            ) : null}
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            ) : null}
          </div>
        )}

        <div className="footer-rule" />
        <p className="footer-credit">
          {couple.hashtag ? `${couple.hashtag} · ` : ""}Made with love
        </p>
        <div className="footer-maker" aria-label="Designed by Karthik">
          <svg className="maker-mark" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="24" cy="24" r="17.5" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
            <circle cx="24" cy="3.6" r="1.1" fill="currentColor" />
            <circle cx="24" cy="44.4" r="1.1" fill="currentColor" />
            <text x="24" y="31.5" textAnchor="middle" fill="currentColor">K</text>
          </svg>
          <a href="tel:+919113958078" className="footer-maker-num">+91 91139 58078</a>
        </div>
      </div>
    </footer>
  );
}
