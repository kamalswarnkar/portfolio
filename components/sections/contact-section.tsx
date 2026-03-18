"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { contacts, resumeFile } from "@/data/portfolio-data";

const iconMap = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

export const ContactSection = forwardRef<HTMLElement, {}>(function ContactSection(_props, ref) {
  return (
    <section id="contact" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Final Signal" title="Contact Console" />

      <div className="panel-frame clip-corners relative mt-10 overflow-hidden rounded-[2rem] px-5 py-7 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.16),transparent_42%)]" />

        <div className="relative z-10 grid gap-5 sm:gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.social.map((contact, index) => {
              const Icon = iconMap[contact.label as keyof typeof iconMap];
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6, boxShadow: "0 0 28px rgba(57,255,20,0.22)" }}
                  className="panel-frame rounded-[1.75rem] p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg uppercase tracking-[0.12em] text-white sm:text-xl">
                        {contact.label}
                      </h3>
                      {/* truncate prevents long URLs overflowing on narrow screens */}
                      <p className="mt-1.5 truncate text-sm text-white/66 sm:text-base">{contact.detail}</p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Stacked on mobile, 3-col on lg+ */}
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div className="rounded-[1.75rem] border border-accent/18 bg-black/30 p-5">
              <div className="flex items-center gap-3 text-accent">
                <Mail size={16} />
                <p className="text-xs uppercase tracking-[0.3em]">Email</p>
              </div>
              <a
                href={`mailto:${contacts.email}`}
                /* break-all ensures long email addresses wrap on tiny screens */
                className="mt-3 block break-all text-base text-white/84 transition hover:text-accent sm:text-lg md:text-xl"
              >
                {contacts.email}
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-accent/18 bg-black/30 p-5">
              <div className="flex items-center gap-3 text-accent">
                <Phone size={16} />
                <p className="text-xs uppercase tracking-[0.3em]">Phone</p>
              </div>
              <a
                href={`tel:${contacts.phone}`}
                className="mt-3 block text-base text-white/84 transition hover:text-accent sm:text-lg md:text-xl"
              >
                {contacts.phone}
              </a>
            </div>

            <a
              href={resumeFile.href}
              download
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-accent/36 bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:shadow-[0_0_34px_rgba(57,255,20,0.3)] lg:w-auto"
            >
              <Download size={18} />
              {resumeFile.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});
