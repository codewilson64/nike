import CartItems from 'components/CartItems'
import { getGuestCartItems } from 'lib/actions/cart-actions'

export default async function CartPage() {
  const { items } = await getGuestCartItems()

  return (
    <CartItems items={items}/>
  )
}
