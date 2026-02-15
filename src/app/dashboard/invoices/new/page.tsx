
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ChevronLeft } from 'lucide-react'
import InvoiceForm from '@/components/invoice-form'

export default async function NewInvoicePage() {
    const supabase = await createClient()

    const { data: clients } = await supabase
        .from('clients')
        .select('id, name')
        .order('name')

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/dashboard/invoices"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Invoices
                </Link>
                <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Create New Invoice
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Fill in the details below to create a new invoice for your client.
                </p>
            </div>

            <InvoiceForm clients={clients || []} />
        </div>
    )
}
