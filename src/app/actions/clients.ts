
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createClientAction(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const address = formData.get('address') as string

    // Server-side validation
    if (!name) {
        return { error: 'Client name is required.' }
    }

    const { error } = await supabase.from('clients').insert({
        name,
        email,
        address,
        user_id: user.id,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
    return { success: true, message: 'Client created successfully!' }
}

export async function deleteClientAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('clients').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
}

export async function updateClientAction(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const address = formData.get('address') as string

    const { error } = await supabase.from('clients').update({
        name,
        email,
        address
    }).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/clients')
    redirect('/dashboard/clients')
}
