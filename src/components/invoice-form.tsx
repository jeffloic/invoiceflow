
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createInvoiceAction } from '@/app/actions/invoices'
import toast from 'react-hot-toast'
import { Calendar, DollarSign, FileText, User } from 'lucide-react'
import Spinner from '@/components/spinner'

type Client = {
    id: string
    name: string
}

export default function InvoiceForm({ clients }: { clients: Client[] }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const formData = new FormData(event.currentTarget)
        const response = await createInvoiceAction(formData)

        if (response?.error) {
            setError(response.error)
            toast.error(response.error)
            setLoading(false)
        } else if (response?.success) {
            toast.success(response.message || 'Invoice created successfully!')
            setSuccess(response.message || 'Invoice created successfully!')
            // Optional: Redirect after a short delay or immediately
            setTimeout(() => {
                router.push('/dashboard/invoices')
                router.refresh()
            }, 1000)
        } else {
            // Fallback
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">{success}</p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                    Client <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        id="clientId"
                        name="clientId"
                        required
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 border"
                        defaultValue=""
                    >
                        <option value="" disabled>Select a client</option>
                        {clients?.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                {clients.length === 0 && (
                    <p className="mt-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                        No clients found. <Link href="/dashboard/clients/new" className="font-medium underline hover:text-amber-800">Add a client first</Link>.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            step="0.01"
                            min="0"
                            required
                            className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 border"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="dueDate"
                            id="dueDate"
                            required
                            className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 border"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                    <select
                        id="status"
                        name="status"
                        required
                        className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 px-3 border"
                        defaultValue="pending"
                    >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description / Notes
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 border"
                        placeholder="Project details..."
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <Link
                    href="/dashboard/invoices"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={loading || clients.length === 0}
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <>
                            <Spinner size="sm" className="mr-2 text-white" />
                            Creating...
                        </>
                    ) : (
                        'Create Invoice'
                    )}
                </button>
            </div>
        </form>
    )
}
