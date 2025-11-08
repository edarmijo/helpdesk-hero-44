-- Grant admin role to users with @sassblum.com email addresses
-- and ensure the signup trigger assigns the role automatically.

-- Update the signup handler so every new user keeps the default
-- "user" role but also gains "admin" if their email matches the domain.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile record based on auth metadata
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );

  -- Always assign the base user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Elevate accounts belonging to the corporate domain
  IF NEW.email ILIKE '%@sassblum.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Backfill existing users so current staff members receive admin privileges.
INSERT INTO public.user_roles (user_id, role)
SELECT p.id, 'admin'
FROM public.profiles p
WHERE p.email ILIKE '%@sassblum.com'
ON CONFLICT (user_id, role) DO NOTHING;
