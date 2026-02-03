'use client'
import logout from '../lib/logout'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      style={{ background: '#e53e3e', color: '#fff', padding: '8px 12px', borderRadius: 6 }}
    >
      Se déconnecter
    </button>
  )
}