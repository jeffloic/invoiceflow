
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, FileText, LogOut, Menu, X } from 'lucide-react'
import { logout } from '@/app/auth/actions'
import { cn } from '@/utils/cn'

interface MobileNavProps {
    userEmail?: string | null
}

export default function MobileNav({ userEmail }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                    <LayoutDashboard className="h-6 w-6 text-indigo-600 mr-2" />
                    <span className="text-xl font-bold text-gray-900">InvoiceFlow</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                    <span className="sr-only">Open menu</span>
                    {isOpen ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={cn("fixed inset-0 z-40 flex", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
                {/* Overlay */}
                <div
                    className={cn(
                        "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300",
                        isOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar */}
                <div className={cn(
                    "relative flex-1 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <X className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <LayoutDashboard className="h-8 w-8 text-indigo-600 mr-2" />
                            <span className="text-2xl font-bold text-gray-900">InvoiceFlow</span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-2 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 group"
                            >
                                <LayoutDashboard className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-900" />
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/clients"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
                            >
                                <Users className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                                Clients
                            </Link>
                            <Link
                                href="/dashboard/invoices"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 group"
                            >
                                <FileText className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                                Invoices
                            </Link>
                        </nav>
                    </div>
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center mb-4">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-medium text-sm">
                                    {userEmail?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="text-base font-medium text-gray-700 truncate w-48">
                                    {userEmail}
                                </p>
                            </div>
                        </div>
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full flex items-center px-2 py-2 text-base font-medium text-red-600 rounded-md hover:bg-red-50 group"
                            >
                                <LogOut className="mr-3 h-6 w-6 text-red-500" />
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
            </div>
        </div>
    )
}
