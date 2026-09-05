import "./Hero.css";
import heroVideo from "../assets/video/mashup bluskrew.mov";
export default function Hero() {
  return (
    <section className="hero">
      <video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  controls={false}
  preload="auto">
  <source src={heroVideo} />
</video>
      <div className="hero-content">
        <h2>
          <>
            Building Artists.
            <br />
            Creating Culture.
          </>
        </h2>

        <p>
          
  Music. Media. Experiences.
</p>
        

       
      </div>
    </section>
  );
}