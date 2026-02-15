
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTables() {
    const { data, error } = await supabase.from('clients').select('id').limit(1);
    if (error) {
        console.error('Error querying clients table:', error.message);
    } else {
        console.log('Clients table exists and is accessible.');
    }
}

checkTables();
