
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createInvoiceAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const clientId = formData.get('clientId') as string
    const amountStr = formData.get('amount') as string
    const description = formData.get('description') as string
    const dueDate = formData.get('dueDate') as string
    const status = formData.get('status') as string

    // Server-side validation
    if (!clientId || !amountStr || !dueDate || !status) {
        return { error: 'Please fill in all required fields.' }
    }

    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount < 0) {
        return { error: 'Amount must be a valid positive number.' }
    }

    const { error } = await supabase.from('invoices').insert({
        user_id: user.id,
        client_id: clientId,
        amount,
        description,
        due_date: dueDate,
        status,
    })

    if (error) {
        return { error: 'Database Error: ' + error.message }
    }

    revalidatePath('/dashboard/invoices')
    return { success: true, message: 'Invoice created successfully!' }
}

export async function deleteInvoiceAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('invoices').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/invoices')
}

export async function updateInvoiceAction(id: string, formData: FormData) {
    // Similar to create but update
    // ...
}
