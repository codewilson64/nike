import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCurrentUser, signOut } from "@/lib/actions/auth-actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()

  return (
    <>
    <Navbar user={user} logout={signOut}/>
      {children}
    <Footer />
    </>
  );
}