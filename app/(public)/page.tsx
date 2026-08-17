import { Hero } from "@/components/home/Hero";
import { HomeQuickLinks } from "@/components/home/HomeQuickLinks";
import { HomeContent } from "@/components/home/HomeContent";

export default function HomePage() {
  return (
    <main>
      <Hero
        image="/images/home/hero.jpg"
        imageAlt="PM SHRI GSSS Dhanau school campus"
        eyebrow="Welcome to"
        title="PM SHRI GSSS Dhanau"
        description="Empowering students through quality education, practical learning, strong values, and opportunities to grow."
        primaryText="Discover Our School"
        primaryHref="/about"
        secondaryText="Explore Academics"
        secondaryHref="/academics"
      />

      <HomeQuickLinks />

      <HomeContent />
    </main>
  );
}