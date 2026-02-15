
'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center">
                    <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Something went wrong
                </h2>
                <p className="text-gray-600 mb-8">
                    We apologize for the inconvenience. An unexpected error occurred.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
