
import Link from 'next/link'
import { login } from '@/app/auth/actions'
import { CheckCheck, LayoutDashboard } from 'lucide-react'

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string; error: string }
}) {
    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 text-center">
                <LayoutDashboard className="mx-auto h-12 w-12 text-indigo-600" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                        href="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        start your 14-day free trial
                    </Link>
                </p>
            </div>

            <form className="space-y-6" action={login}>
                {searchParams?.message && (
                    <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex items-center gap-2" role="alert">
                        <CheckCheck className="w-4 h-4" />
                        {searchParams.message}
                    </div>
                )}
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
                            autoComplete="current-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}
