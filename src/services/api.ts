/**
 * API client for InsureMe backend communication
 * Handles insurance quotes, loan calculations, and provider comparisons
 */

// Support both Vite and Next.js environment variable prefixes
const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:3001/api';

// API Response Types
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface InsuranceQuoteRequest {
  age: number;
  gender: 'male' | 'female';
  smoker: boolean;
  products: {
    type: 'life' | 'trauma' | 'income' | 'mortgage';
    sum_insured: number;
    enabled: boolean;
  }[];
}

interface InsuranceQuoteResponse {
  products: {
    type: 'life' | 'trauma' | 'income' | 'mortgage';
    sum_insured: number;
    premium: number;
    is_estimate: boolean;
  }[];
  total_premium: number;
  age_bracket: string;
  provider_count: number;
}

interface LoanQuoteRequest {
  loan_amount: number;
  term_years: number;
  property_value?: number;
  deposit?: number;
}

interface LoanQuoteResponse {
  loan_amount: number;
  term_years: number;
  interest_rate: number;
  monthly_payment: number;
  total_interest: number;
  is_estimate: boolean;
  provider_count: number;
}

interface ProviderRate {
  provider_name: string;
  logo_url?: string;
  website_url?: string;
  product_name: string;
  description?: string;
  rate_per_100k?: number;
  interest_rate?: number;
  monthly_payment?: number;
  lvr_max?: number;
}

interface SaveQuoteRequest {
  email: string;
  phone?: string;
  name?: string;
  quote_type: 'insurance' | 'loan';
  quote_data: Record<string, unknown>;
  calculator_inputs: Record<string, unknown>;
  total_premium_or_payment?: number;
}

interface SaveQuoteResponse {
  quote_id: string;
  email_sent: boolean;
  message: string;
}

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  context: string;
  preferred_contact: 'email' | 'phone';
}

interface ContactResponse {
  request_id: string;
  message: string;
}

class ApiClient {
  /**
   * Makes HTTP request to backend API with error handling
   * @param endpoint - API endpoint path
   * @param options - Fetch request options
   * @returns Promise with typed response data
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const result: APIResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'API request failed');
    }

    return result.data!;
  }

  async getInsuranceQuote(request: InsuranceQuoteRequest): Promise<InsuranceQuoteResponse> {
    return this.request<InsuranceQuoteResponse>('/insurance/quote', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getLoanQuote(request: LoanQuoteRequest): Promise<LoanQuoteResponse> {
    return this.request<LoanQuoteResponse>('/loan/quote', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getInsuranceProviders(
    productType: 'life' | 'trauma' | 'income' | 'mortgage',
    age: number,
    gender: 'male' | 'female',
    smoker: boolean
  ): Promise<ProviderRate[]> {
    const params = new URLSearchParams({
      product_type: productType,
      age: age.toString(),
      gender,
      smoker: smoker.toString(),
    });

    return this.request<ProviderRate[]>(`/insurance/providers?${params}`);
  }

  async getLoanProviders(
    loanAmount: number,
    termYears: number
  ): Promise<ProviderRate[]> {
    const params = new URLSearchParams({
      loan_amount: loanAmount.toString(),
      term_years: termYears.toString(),
    });

    return this.request<ProviderRate[]>(`/loan/providers?${params}`);
  }

  async saveInsuranceQuote(request: SaveQuoteRequest): Promise<SaveQuoteResponse> {
    return this.request<SaveQuoteResponse>('/insurance/save-quote', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async saveLoanQuote(request: SaveQuoteRequest): Promise<SaveQuoteResponse> {
    return this.request<SaveQuoteResponse>('/loan/save-quote', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async submitContactRequest(request: ContactRequest): Promise<ContactResponse> {
    return this.request<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.json();
  }

  async emailInsuranceQuote(
    email: string,
    quote: InsuranceQuoteResponse,
    userData?: Record<string, unknown>
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>('/insurance/email-quote', {
      method: 'POST',
      body: JSON.stringify({ email, quote, userData }),
    });
  }

  async emailLoanQuote(
    email: string,
    quote: LoanQuoteResponse,
    userData?: Record<string, unknown>
  ): Promise<{ message: string }> {
    return this.request<{ message: string }>('/loan/email-quote', {
      method: 'POST',
      body: JSON.stringify({ email, quote, userData }),
    });
  }
}

export const apiClient = new ApiClient();
export type { InsuranceQuoteRequest, InsuranceQuoteResponse, LoanQuoteRequest, LoanQuoteResponse, ProviderRate, SaveQuoteRequest, SaveQuoteResponse, ContactRequest, ContactResponse };