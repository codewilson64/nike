import CartTotals from 'components/CartTotals'
import DeliveryForm from 'components/DeliveryForm'
import { getGuestCartItems } from 'lib/actions/cart-actions'

export default async function CheckoutDeliveryPage() {
  const { items } = await getGuestCartItems()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
      <DeliveryForm />
      <CartTotals items={items}/>
    </div>
  )
}
