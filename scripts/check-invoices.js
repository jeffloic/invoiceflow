
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTables() {
    const { data, error } = await supabase.from('invoices').select('id').limit(1);
    if (error) {
        console.error('Error querying invoices table:', error.message);
    } else {
        console.log('Invoices table exists and is accessible.');
    }
}

checkTables();
