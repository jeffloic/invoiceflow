
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ClientForm from '@/components/client-form'

export default function NewClientPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/dashboard/clients"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Clients
                </Link>
                <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Add New Client
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Add a new client to manage their invoices.
                </p>
            </div>

            <ClientForm />
        </div>
    )
}
