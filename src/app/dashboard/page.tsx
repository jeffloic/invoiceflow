
import { createClient } from '@/utils/supabase/server'
import { FileText, Clock, CheckCircle } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: invoices } = await supabase
        .from('invoices')
        .select('amount, status')

    const totalInvoices = invoices?.length || 0
    const totalPending = invoices
        ?.filter((i) => i.status === 'pending')
        .reduce((sum, invoice) => sum + Number(invoice.amount), 0) || 0
    const totalPaid = invoices
        ?.filter((i) => i.status === 'paid')
        .reduce((sum, invoice) => sum + Number(invoice.amount), 0) || 0

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">Overview of your activity.</p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Invoices</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{totalInvoices}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-6 w-6 text-yellow-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Amount</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            ${totalPending.toFixed(2)}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-green-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Paid</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            ${totalPaid.toFixed(2)}
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
