import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { getCurrentUser } from "lib/actions/auth-actions";
import { getGuestCartItems, getUserCartItems } from "lib/actions/cart-actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  const cartData = user?.id ? await getUserCartItems() : await getGuestCartItems()
  const quantity = cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <>
    <Navbar user={user} items={{ quantity }}/>
      {children}
    <Footer />
    </>
  );
}