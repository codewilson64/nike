import HeroSection from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getCurrentUser } from "@/lib/actions/auth-actions";

export default async function Home() {
  const user = await getCurrentUser()
  console.log("AuthUser: ", user)
  
  return (
    <main>
      <HeroSection />
      <ProductGrid />
    </main>
  );
}
