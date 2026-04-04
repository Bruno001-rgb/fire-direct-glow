import videoBg from "@/assets/video-section-bg.png";

const VideoShowcase = () => {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden min-h-[700px] flex items-center justify-center"
      style={{ background: "#1A0B2A" }}
    >
      <div className="container max-w-5xl mx-auto px-4 relative z-10 flex items-center justify-center">
        <img
          src={videoBg}
          alt="FireSkins Video Showcase"
          className="w-full max-w-4xl object-contain"
          style={{ filter: "drop-shadow(0 0 40px rgba(0,0,0,0.6))" }}
        />
      </div>
    </section>
  );
};

export default VideoShowcase;
