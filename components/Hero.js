import { config, coupleNames } from "@/lib/config";
import { PeacockFeather, Ganesha } from "./Decorations";

export default function Hero() {
  const { couple, wedding, couplePhoto } = config;
  const { brideName, groomName, nameOrderFirst } = couple;
  const first = nameOrderFirst === "groom" ? groomName : brideName;
  const second = nameOrderFirst === "groom" ? brideName : groomName;

  return (
    <header className="hero" id="home">
      {/* Floating peacock feathers in the background */}
      <PeacockFeather
        className="floating-feather"
        style={{ top: "8%", left: "6%", width: "70px", color: "#1a9c8a", animationDelay: "0s" }}
      />
      <PeacockFeather
        className="floating-feather"
        style={{ top: "16%", right: "8%", width: "90px", color: "#0e6b7a", animationDelay: "1.5s" }}
      />
      <PeacockFeather
        className="floating-feather"
        style={{ bottom: "6%", left: "12%", width: "60px", color: "#147d6f", animationDelay: "3s" }}
      />

      <div className="hero-inner">
        <Ganesha
          className="hero-ganesha"
          style={{ width: 88, margin: "0 auto 14px", color: "#c9a227" }}
        />
        {couple.blessing ? <p className="blessing font-deva">{couple.blessing}</p> : null}

        <div className="hero-photo">
          {/* Replace /public/couple.svg with your own photo (keep the same file name, or update lib/config.js) */}
          <img src={couplePhoto} alt={`${coupleNames()} — the couple`} />
        </div>

        <p className="and-caption">Together with our families</p>

        <h1 className="hero-names">
          {first}
          <span className="amp">&amp;</span>
          {second}
        </h1>

        {couple.heroMessage ? <p className="hero-message">{couple.heroMessage}</p> : null}

        <div className="hero-date">
          <span>{wedding.dateDisplay}</span>
          <span className="dot" />
          <span>{wedding.cityDisplay}</span>
        </div>

        {couple.hashtag ? <p className="hero-hashtag">{couple.hashtag}</p> : null}
      </div>

      <a href="#countdown" className="scroll-cue" aria-label="Scroll down">
        <span className="mouse" />
        <span>Scroll</span>
      </a>
    </header>
  );
}
