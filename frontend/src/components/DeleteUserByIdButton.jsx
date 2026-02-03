'use client'

import { useRouter } from 'next/navigation'

export default function DeleteUserByIdButton({ userId, onDeleted }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Supprimer définitivement cet utilisateur ?')) return

    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(body.error || 'Erreur lors de la suppression')
        return
      }

      if (body.message?.toLowerCase().includes('utilisateur supprimé') && window.location.pathname === `/admin/users/${userId}`) {
        localStorage.removeItem('token')
        router.replace('/auth')
        return
      }

      if (onDeleted) onDeleted(userId)
    } catch (err) {
      alert('Erreur réseau')
    }
  }

  return (
    <button onClick={handleDelete} style={{ background: '#c53030', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>
      Supprimer utilisateur
    </button>
  )
}