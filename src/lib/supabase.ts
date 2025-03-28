import { createClient } from "@supabase/supabase-js";

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Use placeholder values for development if env vars are missing
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (isDevelopment ? "https://placeholder-project.supabase.co" : "");
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (isDevelopment ? "placeholder-key" : "");

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
  );
}

// Create a mock client for development if needed
const createMockClient = () => {
  console.warn(
    "Using mock Supabase client. Set up proper environment variables for full functionality.",
  );
  return {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, session: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({
        data: null,
        error: null,
        unsubscribe: () => {},
      }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" }, error: null }),
      }),
    },
  };
};

// Export the real client if we have credentials, otherwise use the mock
export const supabase =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://placeholder-project.supabase.co"
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (createMockClient() as ReturnType<typeof createClient>);
