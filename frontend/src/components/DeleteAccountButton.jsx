'use client'
import { useRouter } from 'next/navigation'

export default function DeleteAccountButton() {
  const router = useRouter()

  const handleDelete = async () => {
    const ok = window.confirm('Supprimer définitivement votre compte ? Cette action est irréversible.')
    if (!ok) return

    try {
      const res = await fetch('/api/user/me', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        alert(body.error || 'Erreur lors de la suppression')
        return
      }

      // Nettoyage client
      localStorage.removeItem('token')
      // supprimer autres données locales si besoin

      // redirection vers page d'auth
      router.replace('/auth')
    } catch (err) {
      alert('Erreur réseau')
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{ background: '#c53030', color: '#fff', padding: '8px 12px', borderRadius: 6 }}
    >
      Supprimer mon compte
    </button>
  )
}