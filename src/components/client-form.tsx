
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientAction } from '@/app/actions/clients'
import { Loader2, User, Mail, MapPin } from 'lucide-react'

export default function ClientForm() {
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
        const response = await createClientAction(formData)

        if (response?.error) {
            setError(response.error)
            setLoading(false)
        } else if (response?.success) {
            setSuccess('Client created successfully!')
            // Optional: Redirect after a short delay or immediately
            setTimeout(() => {
                router.push('/dashboard/clients')
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 border"
                        placeholder="Acme Corp"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2.5 border"
                        placeholder="contact@acme.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Address
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute top-3 left-3 pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                        id="address"
                        name="address"
                        rows={3}
                        className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 border"
                        placeholder="123 Main St..."
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <Link
                    href="/dashboard/clients"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Creating...
                        </>
                    ) : (
                        'Create Client'
                    )}
                </button>
            </div>
        </form>
    )
}
