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
      </div>
    </footer>
  );
}
