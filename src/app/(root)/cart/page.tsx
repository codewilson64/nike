import CartItems from 'components/CartItems'
import { getCurrentUser } from 'lib/actions/auth-actions'
import { getGuestCartItems, getUserCartItems } from 'lib/actions/cart-actions'

export default async function CartPage() {
  const user = await getCurrentUser()
  const cartData = user?.id ? await getUserCartItems() : await getGuestCartItems()
  const { items, subtotal = 0, delivery = 0, total = 0 } = cartData

  return (
    <CartItems 
      items={items}
      subtotal={subtotal}
      delivery={delivery}
      total={total}
    />
  )
}
