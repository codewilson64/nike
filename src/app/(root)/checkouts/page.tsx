import CartTotals from 'components/CartTotals'
import DeliveryForm from 'components/DeliveryForm'
import { getCurrentUser } from 'lib/actions/auth-actions'
import { getGuestCartItems, getUserCartItems } from 'lib/actions/cart-actions'

export default async function CheckoutDeliveryPage() {
  const user = await getCurrentUser()
  const cartData = user?.id ? await getUserCartItems() : await getGuestCartItems()
  const { items, subtotal = 0, delivery = 0, total = 0 } = cartData

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
      <DeliveryForm />
      <CartTotals
        items={items}
        subtotal={subtotal}
        delivery={delivery}
        total={total}
      />
    </div>
  )
}
