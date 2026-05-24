ALTER TABLE public.operations
  ADD COLUMN IF NOT EXISTS fx_currency_used TEXT,
  ADD COLUMN IF NOT EXISTS fx_rate_to_usd NUMERIC;

NOTIFY pgrst, 'reload schema';