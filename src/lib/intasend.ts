export class IntaSendAPI {
  private publicKey: string;
  private privateKey: string;
  private baseUrl: string;

  constructor(publicKey?: string, privateKey?: string) {
    this.publicKey = publicKey || import.meta.env.VITE_INTASEND_PUBLIC_KEY || '';
    this.privateKey = privateKey || import.meta.env.VITE_INTASEND_PRIVATE_KEY || '';
    this.baseUrl = 'https://payment.intasend.com/api/v1';
  }

  async createPayment({
    amount,
    currency = 'KES',
    email,
    phone_number,
    api_ref,
    method = 'M-PESA'
  }: {
    amount: number;
    currency?: string;
    email: string;
    phone_number?: string;
    api_ref: string;
    method?: string;
  }) {
    if (!this.publicKey || !this.privateKey) {
      throw new Error('IntaSend API keys not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/payment/collection/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-IntaSend-Public-API-Key': this.publicKey,
        },
        body: JSON.stringify({
          amount,
          currency,
          email,
          phone_number,
          api_ref,
          method,
          redirect_url: `${window.location.origin}/payment/success`,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('IntaSend payment error:', error);
      throw error;
    }
  }

  async checkPaymentStatus(transactionId: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/payment/status/${transactionId}/`,
        {
          headers: {
            'X-IntaSend-Public-API-Key': this.publicKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Payment status check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }
}

export const paymentService = new IntaSendAPI();