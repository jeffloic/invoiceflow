
import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import { LayoutDashboard } from 'lucide-react'
import { SubmitButton } from '@/components/submit-button'

export default function SignupPage({
    searchParams,
}: {
    searchParams: { message: string; error: string }
}) {
    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 text-center">
                <LayoutDashboard className="mx-auto h-12 w-12 text-indigo-600" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>

            <form className="space-y-6" action={signup}>
                {searchParams?.error && (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        {searchParams.error}
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <SubmitButton>Sign up</SubmitButton>
                </div>
            </form>
        </div>
    )
}
