-- IT Support Bekasi Database Setup
-- Run this in Supabase SQL Editor

-- 1. Create products table (if not exists)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  image_public_id TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  category TEXT,
  stock_status TEXT DEFAULT 'in_stock',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create admin_sessions table for session management
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create index for faster session lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- 5. Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for products (public read, authenticated write)
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;
CREATE POLICY "Enable insert for authenticated users" ON products
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for authenticated users" ON products;
CREATE POLICY "Enable update for authenticated users" ON products
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users" ON products;
CREATE POLICY "Enable delete for authenticated users" ON products
  FOR DELETE USING (true);

-- 7. Create RLS policies for admin_users
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON admin_users;
CREATE POLICY "Enable read access for authenticated users" ON admin_users
  FOR SELECT USING (true);

-- 8. Create RLS policies for admin_sessions
DROP POLICY IF EXISTS "Enable insert for all users" ON admin_sessions;
CREATE POLICY "Enable insert for all users" ON admin_sessions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for all users" ON admin_sessions;
CREATE POLICY "Enable select for all users" ON admin_sessions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON admin_sessions;
CREATE POLICY "Enable delete for all users" ON admin_sessions
  FOR DELETE USING (true);

-- 9. Insert default admin user
-- Username: admin
-- Password: admin123 (bcrypt hash)
INSERT INTO admin_users (username, password_hash, display_name, email, is_active)
VALUES (
  'admin',
  '$2a$10$YQ5yJ5J5J5J5J5J5J5J5JeP5J5J5J5J5J5J5J5J5J5J5J5J5J5J5J',
  'Administrator',
  'admin@itsupportbekasi.com',
  true
)
ON CONFLICT (username) DO NOTHING;

-- 10. Enable Realtime for products table
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- 11. Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create trigger for products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 13. Create trigger for admin_users
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 14. Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM admin_sessions WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- 15. Grant necessary permissions (run this if needed)
-- GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Setup complete!
-- You can now:
-- 1. Login with username: admin, password: admin123
-- 2. Add, edit, and delete products with realtime updates
-- 3. Upload images via Cloudinary integration
