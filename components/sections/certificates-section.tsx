"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { certificates } from "@/data/portfolio-data";

export const CertificatesSection = forwardRef<HTMLElement, {}>(function CertificatesSection(
  _props,
  ref,
) {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[number] | null>(
    null,
  );

  return (
    <section id="certificates" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Proof Archive" title="Certificates" />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((certificate, index) => (
          <motion.button
            key={certificate.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8, boxShadow: "0 0 34px rgba(57,255,20,0.22)" }}
            onClick={() => setSelectedCertificate(certificate)}
            className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-5 text-left"
          >
            <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(57,255,20,0.18),transparent_55%,rgba(255,255,255,0.06))]" />
            <div className="relative z-10">
              <div className="rounded-[1.5rem] border border-accent/20 bg-black/35 p-5">
                <div className="rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.2),rgba(0,0,0,0.92)_70%)] p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.34em] text-white/48">{certificate.issuer}</p>
                  <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-full border border-accent/28 bg-accent/10 shadow-[0_0_30px_rgba(57,255,20,0.12)]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/35 bg-black/50">
                      <div className="h-7 w-7 rotate-45 border-x-[3px] border-y-[3px] border-accent" />
                    </div>
                  </div>
                  <p className="mt-5 font-display text-xl uppercase tracking-[0.12em] text-white">
                    {certificate.previewLabel}
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.24em] text-accent/72">
                    Open Certificate
                  </p>
                  <p className="mt-3 text-sm text-white/62">{certificate.period}</p>
                </div>
              </div>
              <h3 className="mt-5 font-display text-2xl uppercase tracking-[0.12em] text-white">
                {certificate.title}
              </h3>
              <p className="mt-3 text-base text-white/70">{certificate.highlight}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCertificate ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="panel-frame clip-corners relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[2.4rem] p-4 md:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.22),transparent_42%),linear-gradient(145deg,rgba(57,255,20,0.12),transparent_55%,rgba(255,255,255,0.04))]" />
              <div className="relative z-10 flex max-h-[calc(88vh-2rem)] flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-accent/70">
                      {selectedCertificate.issuer}
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                      {selectedCertificate.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="rounded-full border border-accent/38 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black"
                  >
                    Close
                  </button>
                </div>

                <div className="hide-scrollbar overflow-y-auto rounded-[2rem] border border-accent/22 bg-black/45 p-3 md:p-4">
                  <div className="rounded-[1.6rem] border border-accent/18 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.16),rgba(0,0,0,0.92)_78%)] p-2 md:p-3">
                    <img
                      src={selectedCertificate.image}
                      alt={`${selectedCertificate.title} certificate`}
                      className="mx-auto h-auto max-h-[68vh] w-auto max-w-full rounded-[1rem] border border-white/10 object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
});
