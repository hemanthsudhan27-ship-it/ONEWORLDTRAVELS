"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Compass,
  Users,
  Baby,
  CalendarDays,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { journeys } from "@/lib/data/journeys";
import { buildPackageEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import EnquiryModal from "@/components/ui/EnquiryModal";

// Form validation schema using Zod
const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{10,15}$/, {
      message: "Please enter a valid phone number (10-15 digits).",
    }),
  destination: z.string().min(1, { message: "Please select a destination / package." }),
  adults: z.string().min(1, { message: "Please select number of adults." }),
  children: z.string().min(1, { message: "Please select number of children." }),
  preferredDate: z.string().min(1, { message: "Please select your preferred travel date." }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  className?: string;
  defaultJourneySlug?: string;
}

export function BookingForm({ className, defaultJourneySlug }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  const defaultJourney = journeys.find((j) => j.slug === defaultJourneySlug);
  const defaultDestinationName = defaultJourney?.title || "";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: defaultDestinationName,
      adults: "2",
      children: "0",
      preferredDate: "",
      message: "",
    },
  });

  useEffect(() => {
    if (defaultDestinationName) {
      reset((prev) => ({
        ...prev,
        destination: defaultDestinationName,
      }));
    }
  }, [defaultDestinationName, reset]);

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);

    const whatsappUrl = buildPackageEnquiryWhatsAppUrl({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone,
      destination: data.destination,
      adults: data.adults,
      children: data.children,
      preferredDate: data.preferredDate,
      message: data.message || undefined,
    });

    setLastWhatsAppUrl(whatsappUrl);

    // Simulate API request delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const handleReset = () => {
    setIsSubmitted(false);
    reset({
      name: "",
      email: "",
      phone: "",
      destination: defaultDestinationName,
      adults: "2",
      children: "0",
      preferredDate: "",
      message: "",
    });
  };

  const intJourneys = journeys.filter((j) => j.category === "International");
  const domJourneys = journeys.filter((j) => j.category === "Domestic");

  return (
    <div
      className={cn(
        "w-full bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-zinc-200/30 max-h-[calc(100vh-6rem)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full transition-all",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 bg-[#C4171A]/10 text-[#C4171A] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          One World Concierge
        </div>
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C4171A]" />
          Instant Booking Assistance
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-900 mb-1.5 font-serif flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#C4171A] shrink-0" />
          Plan Your Journey
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed font-sans">
          Fill out the details below. Our luxury travel curators will design your customized itinerary and connect via WhatsApp.
        </p>
      </div>

      {isSubmitted ? (
        /* SUCCESS VIEW */
        <div className="flex flex-col items-center justify-center py-8 px-2 text-center space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-full text-emerald-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h4 className="font-serif font-bold text-xl text-zinc-900">
            Enquiry Prepared & Sent!
          </h4>
          <p className="text-sm text-zinc-600 max-w-xs leading-relaxed">
            Thank you for choosing One World Travel & Tours. A dedicated tour coordinator will assist you with pricing, flight bookings, and customized itineraries.
          </p>

          <div className="pt-2 flex flex-col gap-2.5 w-full">
            {lastWhatsAppUrl && (
              <a
                href={lastWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C4171A] hover:bg-[#991217] text-white text-sm font-semibold rounded-xl py-3 px-6 shadow-md shadow-[#C4171A]/20 transition-all"
              >
                <Send className="w-4 h-4" />
                Reopen WhatsApp Chat
              </a>
            )}
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full rounded-xl py-2.5 text-xs font-semibold border-zinc-200 hover:bg-zinc-50"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      ) : (
        /* FORM VIEW */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-name" className="text-xs font-bold text-zinc-800">
              Full Name <span className="text-[#C4171A]">*</span>
            </Label>
            <Input
              id="booking-name"
              placeholder="e.g. John Doe"
              {...register("name")}
              className={errors.name ? "border-red-500 focus-visible:ring-red-500/20" : ""}
            />
            {errors.name && (
              <p className="text-[11px] font-semibold text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-email" className="text-xs font-bold text-zinc-800">
              Email Address <span className="text-zinc-400 text-[10px] font-normal">(Optional)</span>
            </Label>
            <Input
              id="booking-email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500/20" : ""}
            />
            {errors.email && (
              <p className="text-[11px] font-semibold text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-phone" className="text-xs font-bold text-zinc-800">
              Phone / WhatsApp Number <span className="text-[#C4171A]">*</span>
            </Label>
            <Input
              id="booking-phone"
              placeholder="+91 907 2329 992"
              {...register("phone")}
              className={errors.phone ? "border-red-500 focus-visible:ring-red-500/20" : ""}
            />
            {errors.phone && (
              <p className="text-[11px] font-semibold text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Destination / Package */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-destination" className="text-xs font-bold text-zinc-800">
              Selected Package / Destination <span className="text-[#C4171A]">*</span>
            </Label>
            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="booking-destination"
                    className={`w-full ${
                      errors.destination ? "border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  >
                    <SelectValue placeholder="Choose a destination or journey..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    <SelectItem
                      value="General / Custom Itinerary"
                      className="font-bold text-[#C4171A] focus:bg-[#C4171A]/10"
                    >
                      General / Custom Itinerary (Any Destination)
                    </SelectItem>

                    {/* International */}
                    {intJourneys.length > 0 && (
                      <SelectGroup className="pt-2">
                        <SelectLabel className="text-[10px] font-extrabold uppercase tracking-widest text-[#C4171A] bg-[#C4171A]/5 rounded-md px-2 py-1 mb-1">
                          International Holidays
                        </SelectLabel>
                        {intJourneys.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.title}
                            className="text-xs py-2"
                          >
                            <div className="flex items-center justify-between w-full gap-2">
                              <span className="font-semibold text-zinc-800">{pkg.title}</span>
                              <span className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full font-bold shrink-0">
                                {pkg.duration}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}

                    {/* Domestic */}
                    {domJourneys.length > 0 && (
                      <SelectGroup className="pt-2">
                        <SelectLabel className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 rounded-md px-2 py-1 mb-1">
                          Domestic Tours & Getaways
                        </SelectLabel>
                        {domJourneys.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.title}
                            className="text-xs py-2"
                          >
                            <div className="flex items-center justify-between w-full gap-2">
                              <span className="font-semibold text-zinc-800">{pkg.title}</span>
                              <span className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full font-bold shrink-0">
                                {pkg.duration}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.destination && (
              <p className="text-[11px] font-semibold text-red-600">
                {errors.destination.message}
              </p>
            )}
          </div>

          {/* Adults + Children */}
          <div className="grid grid-cols-2 gap-3">
            {/* Adults */}
            <div className="space-y-1.5">
              <Label
                htmlFor="booking-adults"
                className="text-xs font-bold text-zinc-800 flex items-center gap-1"
              >
                <Users className="h-3 w-3 text-[#C4171A]" />
                Adults <span className="text-[#C4171A]">*</span>
              </Label>
              <Controller
                name="adults"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="booking-adults"
                      className={`w-full ${
                        errors.adults ? "border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((n) => (
                        <SelectItem key={n} value={n} className="text-sm">
                          {n} {parseInt(n) === 1 ? "Adult" : "Adults"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.adults && (
                <p className="text-[11px] font-semibold text-red-600">{errors.adults.message}</p>
              )}
            </div>

            {/* Children */}
            <div className="space-y-1.5">
              <Label
                htmlFor="booking-children"
                className="text-xs font-bold text-zinc-800 flex items-center gap-1"
              >
                <Baby className="h-3 w-3 text-[#C4171A]" />
                Children
              </Label>
              <Controller
                name="children"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="booking-children"
                      className={`w-full ${
                        errors.children ? "border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["0", "1", "2", "3", "4", "5", "5+"].map((n) => (
                        <SelectItem key={n} value={n} className="text-sm">
                          {n === "0" ? "No Children" : `${n} ${parseInt(n) === 1 ? "Child" : "Children"}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.children && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.children.message}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Travel Date */}
          <div className="space-y-1.5">
            <Label
              htmlFor="booking-date"
              className="text-xs font-bold text-zinc-800 flex items-center gap-1"
            >
              <CalendarDays className="h-3 w-3 text-[#C4171A]" />
              Preferred Travel Date <span className="text-[#C4171A]">*</span>
            </Label>
            <Input
              id="booking-date"
              type="date"
              {...register("preferredDate")}
              min={new Date().toISOString().split("T")[0]}
              className={errors.preferredDate ? "border-red-500 focus-visible:ring-red-500/20" : ""}
            />
            {errors.preferredDate && (
              <p className="text-[11px] font-semibold text-red-600">
                {errors.preferredDate.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-message" className="text-xs font-bold text-zinc-800">
              Special Requests or Notes <span className="text-zinc-400 text-[10px] font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="booking-message"
              placeholder="e.g. Flight preference, hotel star rating, dietary requests..."
              rows={2}
              {...register("message")}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#C4171A] hover:bg-[#991217] text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-[#C4171A]/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all text-sm mt-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Preparing WhatsApp Message...
              </>
            ) : (
              <>
                Enquire on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          {/* Alternative trigger for Full Modal view */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-medium text-zinc-500 hover:text-[#C4171A] transition-colors underline underline-offset-4"
            >
              Prefer a pop-up modal view? Click here
            </button>
          </div>
        </form>
      )}

      {/* Embedded Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDestination={defaultDestinationName}
      />
    </div>
  );
}
