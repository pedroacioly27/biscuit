const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.URL, process.env.SERVICE_ROLE);

module.exports = supabase;
