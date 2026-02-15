
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
    title: string
    description: string
    icon: LucideIcon
    actionLabel?: string
    actionHref?: string
}

export default function EmptyState({
    title,
    description,
    icon: Icon,
    actionLabel,
    actionHref,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-dashed border-gray-300 min-h-[400px]">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-50 rounded-full">
                <Icon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="max-w-sm mb-6 text-sm text-gray-500">{description}</p>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    )
}
