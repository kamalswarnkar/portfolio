"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { contacts } from "@/data/portfolio-data";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export const ContactSection = forwardRef<HTMLElement, {}>(function ContactSection(_props, ref) {
  const [selectedContact, setSelectedContact] = useState<{ label: string; pulse: number } | null>(null);

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading
        eyebrow="Transmit Signal"
        title="Open Communication Channels"
        description="A radar-style command center for recruiters, collaborators, and teams looking to connect."
      />

      <div className="panel-frame clip-corners relative mt-10 overflow-hidden rounded-[2rem] px-6 py-10 md:px-10">
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-accent/20" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent/20" />

        {selectedContact ? (
          <motion.div
            key={`${selectedContact.label}-${selectedContact.pulse}`}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/45"
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 4.4, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ) : null}

        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-accent/70">Transmission Ready</p>
            <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.15em] text-white">
              Recruiter Radar Online
            </h3>
            <p className="mt-5 max-w-xl text-lg text-white/72">
              Select a communication channel to trigger a signal pulse and open the corresponding contact route.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {contacts.map((contact) => {
              const Icon = iconMap[contact.label as keyof typeof iconMap];
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(57,255,20,0.22)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setSelectedContact((current) => ({
                      label: contact.label,
                      pulse: (current?.pulse ?? 0) + 1,
                    }))
                  }
                  className="panel-frame rounded-[1.75rem] p-5 text-left"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent/10">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h4 className="mt-5 font-display text-xl uppercase tracking-[0.12em] text-white">
                    {contact.label}
                  </h4>
                  <p className="mt-3 text-base text-white/68">{contact.detail}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});
