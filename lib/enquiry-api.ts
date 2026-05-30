import { apiPost } from "@/utils/api";

export type EnquiryRequestPayload = {
  productId: string;
  productName: string;
  productSlug: string;
  productModel: string;
  company: string;
  email: string;
};

export type EnquiryOtpRequestResponse = {
  message: string;
  enquiryId: string;
  email: string;
  expiresAt: string;
  deliveryMode: string;
  devOtp?: string;
  product: {
    id: string;
    name: string;
    slug: string;
    model: string;
    company: string;
  };
};

export type VerifyEmailOtpPayload = {
  enquiryId: string;
  otp: string;
};

export type VerifyEmailOtpResponse = {
  message: string;
  enquiryId: string;
  email: string;
  status: string;
};

export type SubmitEnquiryPayload = {
  enquiryId: string;
  phoneCountryCode: string;
  phoneNumber: string;
  message: string;
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

export async function requestEmailOtp(payload: EnquiryRequestPayload): Promise<EnquiryOtpRequestResponse> {
  const response = await apiPost<EnquiryOtpRequestResponse>("/enquiries/request-email-otp", payload);

  return response.data;
}

export type GeneralEnquiryOtpRequestPayload = {
  name?: string;
  company?: string;
  email: string;
  message?: string;
};

export type GeneralEnquiryOtpRequestResponse = {
  message: string;
  enquiryId: string;
  email: string;
  expiresAt: string;
  deliveryMode: string;
  devOtp?: string;
};

export async function requestEmailOtpGeneral(payload: GeneralEnquiryOtpRequestPayload): Promise<GeneralEnquiryOtpRequestResponse> {
  const response = await apiPost<GeneralEnquiryOtpRequestResponse>("/enquiries/general/request-email-otp", payload);

  return response.data;
}

export async function verifyEmailOtp(payload: VerifyEmailOtpPayload): Promise<VerifyEmailOtpResponse> {
  const response = await apiPost<VerifyEmailOtpResponse>("/enquiries/verify-email-otp", payload);

  return response.data;
}

export async function verifyEmailOtpGeneral(payload: VerifyEmailOtpPayload): Promise<VerifyEmailOtpResponse> {
  const response = await apiPost<VerifyEmailOtpResponse>("/enquiries/general/verify-email-otp", payload);

  return response.data;
}

export async function submitEnquiry(payload: SubmitEnquiryPayload): Promise<SubmitEnquiryResponse> {
  const response = await apiPost<SubmitEnquiryResponse>("/enquiries/submit", payload);

  return response.data;
}

export async function submitGeneralEnquiry(payload: SubmitEnquiryPayload): Promise<SubmitEnquiryResponse> {
  const response = await apiPost<SubmitEnquiryResponse>("/enquiries/general/submit", payload);

  return response.data;
}