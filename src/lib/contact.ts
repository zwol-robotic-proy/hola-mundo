export const contactConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "ZWOL-HOME",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://zwol-home.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zwolhome@gmail.com",
  notificationEmail: process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zwolhome@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "1136834491",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "+54 11 3683-4491",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/zwol.robotic?igsh=MXJ4c2QyMWt0aDgzbQ==",
  instagramLabel: process.env.NEXT_PUBLIC_INSTAGRAM_LABEL || "@zwol.robotic",
  whatsappMessage: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hola, vengo de ZWOL-HOME y quiero consultar por un proyecto.",
  senderName: process.env.NEXT_PUBLIC_EMAIL_SENDER_NAME || "ZWOL-HOME",
  senderEmail: process.env.NEXT_PUBLIC_EMAIL_SENDER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zwolhome@gmail.com",
  signature: process.env.NEXT_PUBLIC_EMAIL_SIGNATURE || "Atentamente,\nEquipo ZWOL-HOME\nwww.zwol-home.com",
};

export function buildWhatsAppLink(phone = contactConfig.phone, message = contactConfig.whatsappMessage) {
  const normalizedPhone = phone.replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/54${normalizedPhone.startsWith("54") ? normalizedPhone.slice(2) : normalizedPhone}?text=${encodedMessage}`;
}

export function getAppUrl() {
  return contactConfig.appUrl;
}
