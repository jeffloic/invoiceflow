
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Client } from '@/types'
import EmptyState from '@/components/empty-state'

export default async function ClientsPage() {
    const supabase = await createClient()

    const cookieStore = await cookies()
    const isDemo = cookieStore.get('is_demo')?.value === 'true'

    let clients: Client[] | null = null

    if (isDemo) {
        clients = [
            {
                id: 'demo-client-1',
                user_id: 'demo-user',
                name: 'Acme Corp',
                email: 'billing@acme.com',
                address: '123 Tech Park, Silicon Valley, CA',
                image_url: null,
                created_at: new Date().toISOString(),
            },
            {
                id: 'demo-client-2',
                user_id: 'demo-user',
                name: 'Globex Corporation',
                email: 'accounts@globex.com',
                address: '456 Business Blvd, New York, NY',
                image_url: null,
                created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
            }
        ]
    } else {
        const { data } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false })
        clients = data
    }

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Clients
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <Link
                        href="/dashboard/clients/new"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        New Client
                    </Link>
                </div>
            </div>

            {/* Client List */}
            {/* Client List */}
            <div className="mt-8 flex flex-col">
                {(!clients || clients.length === 0) ? (
                    <EmptyState
                        title="No clients yet"
                        description="Add your first client to begin invoicing."
                        icon={Plus}
                        actionLabel="New Client"
                        actionHref="/dashboard/clients/new"
                    />
                ) : (
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Created
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {clients?.map((client: Client) => (
                                            <tr key={client.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                    <div className="text-sm text-gray-500">{client.address}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{client.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(client.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/dashboard/clients/${client.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
