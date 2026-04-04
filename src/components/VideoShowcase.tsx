import videoBg from "@/assets/video-section-bg.jpg";

const VideoShowcase = () => {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden py-20"
      style={{
        background: `url(${videoBg}) center center / cover no-repeat`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#1A0B2A]/40" />

      <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
        <p className="text-muted-foreground text-sm">Seção de vídeo — aguardando modelagem</p>
      </div>
    </section>
  );
};

export default VideoShowcase;
