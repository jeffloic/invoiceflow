
'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <Printer className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Download PDF
        </button>
    )
}
