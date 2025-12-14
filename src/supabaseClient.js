import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cbcdrjzrcsydtjzxmboz.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY2RyanpyY3N5ZHRqenhtYm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTA3MzAsImV4cCI6MjA4MDg2NjczMH0.FHAcyCfhYammXwlArTQ8uKwWuSJasVKPCht_XaB-PQY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
