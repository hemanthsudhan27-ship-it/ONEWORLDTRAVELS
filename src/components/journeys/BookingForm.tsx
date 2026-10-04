"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeys } from "@/lib/data/journeys";
import { buildJourneyEnquiryUrl } from "@/lib/whatsapp";

interface BookingFormProps {
  className?: string;
  defaultJourneySlug?: string;
}

export function BookingForm({ className, defaultJourneySlug }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    travelDates: "",
    travelers: "",
    journeySlug: defaultJourneySlug || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedJourney = journeys.find((j) => j.slug === formData.journeySlug);
    
    if (!selectedJourney) return;

    const url = buildJourneyEnquiryUrl(
      selectedJourney.title,
      selectedJourney.destination,
      {
        name: formData.name,
        phone: formData.phone,
        travelDates: formData.travelDates,
        travelers: formData.travelers,
      }
    );

    window.open(url, "_blank");
  };

  return (
    <div className={cn("w-full bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-xl shadow-zinc-200/20 max-h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full", className)}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-900 mb-2 font-serif">
          Plan Your Journey
        </h3>
        <p className="text-sm text-zinc-500">
          Fill out the details below and our travel experts will reach out to you via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ahdeetai"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Approx. Travel Date
            </label>
            <input
              type="date"
              name="travelDates"
              required
              value={formData.travelDates}
              onChange={handleChange}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Travellers
            </label>
            <input
              type="number"
              name="travelers"
              min="1"
              required
              value={formData.travelers}
              onChange={handleChange}
              placeholder="2"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
            Selected Package
          </label>
          <div className="relative">
            <select
              name="journeySlug"
              required
              value={formData.journeySlug}
              onChange={handleChange}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 appearance-none"
            >
              <option value="" disabled>Select a package</option>
              {journeys.map((j) => (
                <option key={j.slug} value={j.slug}>
                  {j.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-fit mt-2 h-12 px-8 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white group transition-colors">
          Enquire on WhatsApp
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </form>
    </div>
  );
}
