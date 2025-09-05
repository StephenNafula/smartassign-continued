export interface User {
  id: string;
  email: string;
  full_name: string;
  plan: 'free' | 'pay_per_doc' | 'monthly' | 'premium';
  documents_count: number;
  subscription_ends_at?: string;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  content: string;
  formatted_content: string;
  created_at: string;
  updated_at: string;
  exported_count: number;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  plan_type: string;
  status: 'pending' | 'completed' | 'failed';
  intasend_transaction_id?: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  type: 'free' | 'pay_per_doc' | 'monthly' | 'premium';
}