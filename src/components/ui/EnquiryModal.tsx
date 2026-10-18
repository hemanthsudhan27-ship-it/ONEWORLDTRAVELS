"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import {
  CheckCircle2,
  Loader2,
  Compass,
  Users,
  Baby,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { buildPackageEnquiryWhatsAppUrl } from "@/lib/whatsapp";

// Form validation schema using Zod
const enquirySchema = z.object({
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

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export interface EnquiryModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  initialDestination?: string;
  trigger?: React.ReactNode;
}

export default function EnquiryModal({
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  onClose,
  initialDestination = "",
  trigger,
}: EnquiryModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  const isControlled = controlledIsOpen !== undefined;
  const open = isControlled ? controlledIsOpen : internalIsOpen;

  const setOpen = (newOpen: boolean) => {
    if (isControlled) {
      controlledOnOpenChange?.(newOpen);
      if (!newOpen && onClose) onClose();
    } else {
      setInternalIsOpen(newOpen);
      if (!newOpen && onClose) onClose();
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: initialDestination || "",
      adults: "2",
      children: "0",
      preferredDate: "",
      message: "",
    },
  });

  // Pre-fill destination when modal opens or initial destination changes
  useEffect(() => {
    if (open) {
      setIsSubmitted(false);
      reset({
        name: "",
        email: "",
        phone: "",
        destination: initialDestination || "",
        adults: "2",
        children: "0",
        preferredDate: "",
        message: "",
      });
    }
  }, [open, initialDestination, reset]);

  const onSubmit = async (data: EnquiryFormValues) => {
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

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 300);
  };

  const intJourneys = journeys.filter((j) => j.category === "International");
  const domJourneys = journeys.filter((j) => j.category === "Domestic");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-[92vw] sm:max-w-[500px] p-5 sm:p-7 max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C4171A]/10 text-[#C4171A] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-sans">
            <Sparkles className="w-3 h-3" />
            One World Travel & Tours
          </span>
          <span className="text-zinc-300 text-xs">·</span>
          <span className="text-[11px] text-zinc-500 font-medium">Puthiyara, Calicut</span>
        </div>

        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2.5 text-zinc-900 tracking-tight">
            <Compass className="h-5 w-5 text-[#C4171A]" />
            Plan Your Journey
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 font-sans leading-relaxed">
            {isSubmitted
              ? "Your request has been prepared and dispatched."
              : "Fill out the details below. Our luxury travel curators will personalize your package & connect on WhatsApp within hours."}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          /* SUCCESS VIEW */
          <div className="flex flex-col items-center justify-center py-8 px-2 text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-full text-emerald-600">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h3 className="font-serif font-bold text-xl text-zinc-900">
              Enquiry Submitted!
            </h3>
            <p className="text-sm text-zinc-600 max-w-sm leading-relaxed">
              Thank you for choosing <strong className="text-zinc-900">One World Travel & Tours</strong>. Our destination specialist is ready with your custom itinerary.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
              {lastWhatsAppUrl && (
                <a
                  href={lastWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C4171A] hover:bg-[#991217] text-white text-sm font-semibold rounded-xl py-3 px-6 shadow-md shadow-[#C4171A]/20 transition-all"
                >
                  Open WhatsApp Chat
                </a>
              )}
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full rounded-xl py-3 text-sm font-semibold border-zinc-200 hover:bg-zinc-50"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="modal-enquiry-name" className="text-xs font-bold text-zinc-800">
                Full Name <span className="text-[#C4171A]">*</span>
              </Label>
              <Input
                id="modal-enquiry-name"
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
              <Label htmlFor="modal-enquiry-email" className="text-xs font-bold text-zinc-800">
                Email Address <span className="text-zinc-400 text-[10px] font-normal">(Optional)</span>
              </Label>
              <Input
                id="modal-enquiry-email"
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
              <Label htmlFor="modal-enquiry-phone" className="text-xs font-bold text-zinc-800">
                Phone / WhatsApp Number <span className="text-[#C4171A]">*</span>
              </Label>
              <Input
                id="modal-enquiry-phone"
                placeholder="+91 907 2329 992"
                {...register("phone")}
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500/20" : ""}
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Destination Selection */}
            <div className="space-y-1.5">
              <Label htmlFor="modal-enquiry-destination" className="text-xs font-bold text-zinc-800">
                Destination / Package <span className="text-[#C4171A]">*</span>
              </Label>
              <Controller
                name="destination"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="modal-enquiry-destination"
                      className={`w-full ${
                        errors.destination ? "border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    >
                      <SelectValue placeholder="Choose a destination or journey..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[320px] overflow-y-auto">
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

            {/* Adults + Children side by side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Adults */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="modal-enquiry-adults"
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
                        id="modal-enquiry-adults"
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
                  htmlFor="modal-enquiry-children"
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
                        id="modal-enquiry-children"
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
                htmlFor="modal-enquiry-date"
                className="text-xs font-bold text-zinc-800 flex items-center gap-1"
              >
                <CalendarDays className="h-3 w-3 text-[#C4171A]" />
                Preferred Travel Date <span className="text-[#C4171A]">*</span>
              </Label>
              <Input
                id="modal-enquiry-date"
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
              <Label htmlFor="modal-enquiry-message" className="text-xs font-bold text-zinc-800">
                Special Requests or Notes <span className="text-zinc-400 text-[10px] font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="modal-enquiry-message"
                placeholder="Tell us about preferred accommodations, flight requirements, or custom stops..."
                rows={3}
                {...register("message")}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C4171A] hover:bg-[#991217] text-white font-semibold rounded-xl sm:rounded-2xl py-3 shadow-lg shadow-[#C4171A]/20 mt-2 flex items-center justify-center gap-2 transform active:scale-95 transition-all text-sm h-12"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing Your Enquiry...
                </>
              ) : (
                "Submit Inquiry via WhatsApp"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
