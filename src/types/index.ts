
export type Client = {
    id: string
    user_id: string
    name: string
    email: string | null
    address: string | null
    image_url: string | null
    created_at: string
}

export type Invoice = {
    id: string
    user_id: string
    client_id: string
    amount: number
    status: 'paid' | 'pending' | 'draft'
    description: string | null
    due_date: string | null
    created_at: string
    client?: Client // Joined data
}
