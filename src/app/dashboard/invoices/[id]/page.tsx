
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { ChevronLeft, Printer } from 'lucide-react'
import { notFound } from 'next/navigation'
import PrintButton from '@/components/print-button'

export default async function InvoiceCheckPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient()

    // Fetch invoice with client details
    const { data: invoice } = await supabase
        .from('invoices')
        .select('*, client:clients(*)')
        .eq('id', params.id)
        .single()

    if (!invoice) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 print:hidden">
                <Link
                    href="/dashboard/invoices"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Invoices
                </Link>
                <div className="mt-2 flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Invoice #{invoice.id.substring(0, 8)}
                    </h2>
                    <PrintButton />
                </div>
            </div>

            {/* Invoice Template */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 print:shadow-none print:border-none">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 print:border-b-2 print:border-gray-900">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Invoice</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            #{invoice.id}
                        </p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-indigo-600 print:text-black">InvoiceFlow</h3>
                        <p className="text-sm text-gray-500 mt-1">Status: {invoice.status.toUpperCase()}</p>
                    </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Bill To</h4>
                            <p className="text-gray-900 font-medium">{invoice.client.name}</p>
                            <p className="text-gray-600">{invoice.client.email}</p>
                            <p className="text-gray-600 whitespace-pre-wrap">{invoice.client.address}</p>
                        </div>
                        <div className="text-right">
                            <div className="mb-2">
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Due Date:</span>
                                <span className="ml-2 text-gray-900 font-medium">{new Date(invoice.due_date).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Issued:</span>
                                <span className="ml-2 text-gray-900 font-medium">{new Date(invoice.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-8">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Items / Description</h4>
                        <div className="bg-gray-50 p-4 rounded-md print:bg-white print:border print:border-gray-200">
                            <p className="text-gray-900 whitespace-pre-wrap">{invoice.description}</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-8 flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-500">Subtotal</span>
                                <span className="text-gray-900">${Number(invoice.amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="font-medium text-gray-500">Tax (0%)</span>
                                <span className="text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between py-4">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-lg font-bold text-indigo-600 print:text-black">${Number(invoice.amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
