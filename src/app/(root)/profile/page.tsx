import Profile from 'components/Profile'
import { signOut } from 'lib/actions/auth-actions'

export default function ProfilePageWrapper() {
  return <Profile logout={signOut} />
}
