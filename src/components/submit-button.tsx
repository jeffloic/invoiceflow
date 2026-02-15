
'use client'

import { useFormStatus } from 'react-dom'
import Spinner from '@/components/spinner'
import { cn } from '@/utils/cn'

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        >
            {pending ? (
                <>
                    <Spinner size="sm" className="mr-2 text-white" />
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    )
}
