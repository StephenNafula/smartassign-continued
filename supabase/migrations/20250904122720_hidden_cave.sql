/*
  # Create payments table for tracking transactions

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - references users table
      - `amount` (decimal) - payment amount
      - `currency` (text) - payment currency (KES)
      - `plan_type` (text) - which plan was purchased
      - `status` (text) - payment status
      - `intasend_transaction_id` (text) - IntaSend transaction reference
      - `created_at` (timestamp)
      - `completed_at` (timestamp) - when payment was completed

  2. Security
    - Enable RLS on `payments` table
    - Add policies for users to read their own payment history
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  plan_type text NOT NULL CHECK (plan_type IN ('pay_per_doc', 'monthly', 'premium')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  intasend_transaction_id text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admin policy for payment processing (service role)
CREATE POLICY "Service role can manage payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_intasend_id ON payments(intasend_transaction_id);