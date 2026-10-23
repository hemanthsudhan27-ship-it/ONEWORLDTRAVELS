/**
 * Centralized WhatsApp & Contact configuration for One World Travel & Tours.
 * Primary contact details from Puthiyara, Calicut office.
 */

export const PRIMARY_PHONE = "+91 9746 299 992"
export const SECONDARY_PHONE = "+91 952 6617 757"
export const OFFICE_LOCATION = "27/19, First Floor, Zam Zam Building, Mini Bypass Road, Puthiyara, Calicut, Kerala"

// Primary WhatsApp number (normalized for wa.me)
export const WHATSAPP_NUMBER = "919746299992"
export const WHATSAPP_NUMBER_ALT = "919526617757"
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/**
 * Build a WhatsApp URL with a pre-filled message.
 */
export function buildWhatsAppUrl(message: string, altNumber = false): string {
  const number = altNumber ? WHATSAPP_NUMBER_ALT : WHATSAPP_NUMBER
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/**
 * Build a service-specific WhatsApp enquiry URL.
 */
export function buildServiceEnquiryUrl(
  serviceName: string,
  details?: { name?: string; travelDates?: string; travelers?: string; notes?: string }
): string {
  let message = `Hello One World Travel & Tours, I would like to enquire about your *${serviceName}* service.`
  
  if (details?.name) {
    message += `\nName: ${details.name}`
  }
  if (details?.travelDates) {
    message += `\nPreferred Dates: ${details.travelDates}`
  }
  if (details?.travelers) {
    message += `\nTravellers: ${details.travelers}`
  }
  if (details?.notes) {
    message += `\nRequirements / Notes: ${details.notes}`
  }
  
  message += `\n\nCould you please provide information on availability, requirements, and pricing?`
  return buildWhatsAppUrl(message)
}

export function buildJourneyEnquiryUrl(
  journeyName: string, 
  destination?: string,
  details?: { name?: string; phone?: string; travelDates?: string; travelers?: string }
): string {
  let message = destination
    ? `Hello, I am interested in the *${journeyName}* journey to *${destination}*.`
    : `Hello, I am interested in the *${journeyName}* journey.`
    
  if (details) {
    message += `\n`
    if (details.name) message += `\nName: ${details.name}`
    if (details.phone) message += `\nPhone: ${details.phone}`
    if (details.travelDates) message += `\nPlanned Date: ${details.travelDates}`
    if (details.travelers) message += `\nTravellers: ${details.travelers}`
  }

  message += `\n\nCould you please share the itinerary, pricing, and availability?`
  
  return buildWhatsAppUrl(message)
}

/**
 * Build a destination-specific WhatsApp enquiry URL.
 */
export function buildDestinationEnquiryUrl(destinationName: string): string {
  const message = `Hello, I am interested in travelling to *${destinationName}*.\n\nCould you please share available journeys, pricing, and recommendations?`
  return buildWhatsAppUrl(message)
}

/**
 * Build a comprehensive package enquiry WhatsApp URL with full traveler breakdown.
 */
export function buildPackageEnquiryWhatsAppUrl(data: {
  name: string
  email?: string
  phone: string
  destination: string
  adults: string
  children: string
  preferredDate: string
  message?: string
}): string {
  const childrenText = data.children === "0" ? "None" : data.children
  let message = `Hello One World Travel & Tours, I would like to enquire about a journey package!

*Name*: ${data.name}`

  if (data.email) {
    message += `\n*Email*: ${data.email}`
  }

  message += `
*Phone*: ${data.phone}
*Destination / Package*: ${data.destination}
*Adults*: ${data.adults}
*Children*: ${childrenText}
*Preferred Travel Date*: ${data.preferredDate}`

  if (data.message) {
    message += `\n*Message*: ${data.message}`
  }

  return buildWhatsAppUrl(message)
}

/**
 * Build a general enquiry WhatsApp URL.
 */
export function buildGeneralEnquiryUrl(): string {
  const message = "Hello One World Travel & Tours, I would like to enquire about your travel services.\n\nCould you please help me plan?"
  return buildWhatsAppUrl(message)
}

