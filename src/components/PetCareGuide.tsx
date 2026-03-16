import { motion } from "framer-motion";
import { ExternalLink, HeartPulse, PlayCircle, Sparkles } from "lucide-react";

const videos = [
  {
    title: "Smart home habits and hygiene",
    description: "Use gentle grooming, a clean bed area, and regular checks so small issues do not turn into bigger ones.",
    watchUrl: "https://youtu.be/zPOAaDUzVDY?si=jZoNeiJCCWiBeTu_",
    embedUrl: "https://www.youtube-nocookie.com/embed/zPOAaDUzVDY",
  },
];

const tips = [
  "Feed on a consistent schedule and always refresh water bowls.",
  "Keep vaccines, deworming, and vet checkups on time.",
  "Use short daily play or walk sessions to reduce anxiety.",
  "Check ears, coat, paws, and appetite for early warning signs.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const PetCareGuide = () => {
  return (
    <section id="pet-care-guide" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-background via-furly-cream/60 to-background">
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,140,84,0.18),_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            Pet Care Guide
          </div>
          <h2 className="mt-5 text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight">
            How to take care of your pets,
            <span className="furly-gradient-text"> every single day</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Learn the essentials with a quick Furly care reel and the three YouTube guides below. These cover routines, hygiene, exercise, and signs to watch for.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 right-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 rounded-2xl shadow-sm hover:shadow-lg transition p-0 overflow-hidden border border-white/70 bg-white">
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <video
                  src="/270425.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-4 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-furly-peach px-3 py-1 text-xs font-semibold text-primary">
                    <PlayCircle className="h-4 w-4" />
                    Furly pet care reel
                  </div>
                  <h3 className="mt-3 text-2xl font-heading font-bold text-foreground">Simple routines make pets calmer and healthier</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                    Focus on predictable meals, clean surroundings, affectionate interaction, and small daily movement. Consistency matters more than perfection.
                  </p>
                </div>

                <div className="rounded-2xl bg-foreground px-4 py-3 text-white shadow-sm lg:min-w-[220px]">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">Core routine</p>
                  <p className="mt-1 text-lg font-semibold">Food, water, walks, rest</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative z-10 flex flex-col gap-6 w-full lg:max-w-[520px] lg:ml-auto"
          >
            <motion.div variants={itemVariants} className="rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-white/70 bg-white">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl furly-gradient">
                  <HeartPulse className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground">Quick care checklist</h3>
                  <div className="mt-4 grid gap-3">
                    {tips.map((tip) => (
                      <div key={tip} className="rounded-2xl bg-furly-cream/80 px-4 py-3 text-sm text-foreground">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {videos.map((video) => (
              <motion.div key={video.title} variants={itemVariants} className="rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-white/70 bg-white">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-center p-4 sm:p-6">
                  <div className="min-w-0 rounded-2xl overflow-hidden shadow-lg bg-black border border-black/5">
                    <div className="aspect-video">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="block h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="min-w-0 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h4 className="text-xl font-semibold mb-4 text-foreground">{video.title}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{video.description}</p>
                    <a href={video.watchUrl} target="_blank" rel="noreferrer" className="inline-flex">
                      <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-50 transition">
                        Watch on YouTube
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PetCareGuide;