import HeroSection from "components/Hero";
import { getCurrentUser } from "lib/actions/auth-actions";
import FrontProduct from "components/FrontProduct";

export default async function Home() {
  const user = await getCurrentUser()
  console.log("AuthUser: ", user)
  
  return (
    <main>
      <HeroSection />
      <FrontProduct />
    </main>
  );
}
