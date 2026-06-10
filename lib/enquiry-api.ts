import { apiPost } from "@/utils/api";

// ─── Product Enquiry ───────────────────────────────────────────────────────────

export type SubmitEnquiryPayload = {
  productId: string;
  productName: string;
  productSlug: string;
  productModel: string;
  company: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  message: string;
  turnstileToken: string;
};

export type SubmitEnquiryResponse = {
  message: string;
  enquiry: {
    id: string;
    productName: string;
    productSlug: string;
    productModel: string;
    productId: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    phoneE164: string;
    message: string;
    status: string;
    submittedAt?: string;
  };
};

export async function submitEnquiry(payload: SubmitEnquiryPayload): Promise<SubmitEnquiryResponse> {
  const response = await apiPost<SubmitEnquiryResponse>("/enquiries/submit", payload);
  return response.data;
}

// ─── General Enquiry ──────────────────────────────────────────────────────────

export type SubmitGeneralEnquiryPayload = {
  name: string;
  company: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  city: string;
  enquiryAbout: string;
  message: string;
  turnstileToken: string;
};

export type SubmitGeneralEnquiryResponse = {
  message: string;
  enquiry: {
    id: string;
    email: string;
    phoneE164: string;
    message: string;
    status: string;
    submittedAt?: string;
  };
};

export async function submitGeneralEnquiry(payload: SubmitGeneralEnquiryPayload): Promise<SubmitGeneralEnquiryResponse> {
  const response = await apiPost<SubmitGeneralEnquiryResponse>("/enquiries/general/submit", payload);
  return response.data;
}