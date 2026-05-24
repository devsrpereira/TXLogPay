ALTER TABLE public.operations
ADD COLUMN IF NOT EXISTS operation_value numeric NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_fees numeric NOT NULL DEFAULT 0;
