import styles from './styles.module.scss'
import { useSession, signIn } from 'next-auth/client'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()

  function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}
