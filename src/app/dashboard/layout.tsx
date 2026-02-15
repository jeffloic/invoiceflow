
import { ReactNode } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LayoutDashboard, Users, FileText, LogOut } from 'lucide-react'
import { logout } from '@/app/auth/actions'
import MobileNav from '@/components/dashboard/mobile-nav'

import { cookies } from 'next/headers'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()
    const cookieStore = await cookies()
    const isDemo = cookieStore.get('is_demo')?.value === 'true'

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user && !isDemo) {
        redirect('/login')
    }

    const userEmail = isDemo ? 'demo@invoiceflow.com' : user?.email

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <MobileNav userEmail={userEmail} />

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-sm border-r border-gray-100 hidden md:flex flex-col print:hidden flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <LayoutDashboard className="h-6 w-6 text-indigo-600 mr-2" />
                    <span className="text-xl font-bold text-gray-900">InvoiceFlow</span>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 group"
                    >
                        <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-900" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/clients"
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
                    >
                        <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Clients
                    </Link>
                    <Link
                        href="/dashboard/invoices"
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
                    >
                        <FileText className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                        Invoices
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium text-sm">
                                {userEmail?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 truncate w-32">
                                {userEmail}
                            </p>
                        </div>
                    </div>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 group"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-red-500" />
                            Sign out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
