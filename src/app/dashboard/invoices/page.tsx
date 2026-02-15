
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Invoice } from '@/types'
import EmptyState from '@/components/empty-state'

export default async function InvoicesPage() {
    const supabase = await createClient()

    // Fetch invoices with client details
    const cookieStore = await cookies()
    const isDemo = cookieStore.get('is_demo')?.value === 'true'

    let invoices: any[] | null = null

    if (isDemo) {
        invoices = [
            {
                id: 'inv-001',
                amount: 1200.00,
                status: 'paid',
                due_date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                description: 'Website Redesign',
                client: { name: 'Acme Corp', email: 'billing@acme.com' }
            },
            {
                id: 'inv-002',
                amount: 450.00,
                status: 'pending',
                due_date: new Date(Date.now() + 86400000 * 7).toISOString(),
                created_at: new Date().toISOString(),
                description: 'SEO Consultation',
                client: { name: 'Globex Corporation', email: 'accounts@globex.com' }
            }
        ]
    } else {
        // Fetch invoices with client details
        const { data } = await supabase
            .from('invoices')
            .select('*, client:clients(name, email)') // Join clients table
            .order('created_at', { ascending: false })
        invoices = data
    }

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Invoices
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <Link
                        href="/dashboard/invoices/new"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        New Invoice
                    </Link>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                {(!invoices || invoices.length === 0) ? (
                    <EmptyState
                        title="No invoices yet"
                        description="Create your first invoice to start tracking your income."
                        icon={Plus}
                        actionLabel="New Invoice"
                        actionHref="/dashboard/invoices/new"
                    />
                ) : (
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Inv # / Desc
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Client
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Due Date
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoices?.map((invoice: any) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {invoice.description || 'Invoice'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">#{invoice.id.substring(0, 8)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{invoice.client?.name}</div>
                                                    <div className="text-sm text-gray-500">{invoice.client?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${Number(invoice.amount).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                            invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/dashboard/invoices/${invoice.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                        View
                                                    </Link>
                                                    {/* Generate PDF Button would go here */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
