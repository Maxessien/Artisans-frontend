import Link from "next/link";
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from "react-icons/fa6";

export default function AppFooter() {
  return (
    <footer className="w-full bg-[var(--text-secondary-light)] text-[var(--text-primary-light)] px-6 md:px-12 lg:px-20 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Brand Name</h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Discover unique, handmade creations crafted by talented artisans across Nigeria
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[1.2rem] pt-2">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="cursor-pointer" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="cursor-pointer" />
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="cursor-pointer" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/shop">Shop by Category</Link></li>
            <li><Link href="/new-arrivals">New Arrivals</Link></li>
            <li><Link href="/best-selling">Best Selling</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/shipping-delivery">Shipping &amp; Delivery</Link></li>
            <li><Link href="/return-refund">Return &amp; Refund Policy</Link></li>
            <li><Link href="/track-order">Track Your Order</Link></li>
            <li><Link href="/help-center">Help Centre / Support</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/our-artisans">Our Artisans</Link></li>
            <li><Link href="/become-seller">Become a Seller</Link></li>
            <li><Link href="/how-it-works">How it Works</Link></li>
            <li><Link href="/terms-conditions">Terms and Conditions</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <p className="text-sm">Email: <a href="mailto:support@brand.com" className="underline">support@brand.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+234xxxxxxxxx" className="underline">+234 xxx xxx xxx</a></p>

          {/* App Badges */}
          <div className="pt-4 space-y-3">
            <div className="w-36 h-12 bg-[var(--text-secondary)] rounded-md flex items-center justify-center text-xs">
              App Store Badge
            </div>
            <div className="w-36 h-12 bg-[var(--text-secondary)] rounded-md flex items-center justify-center text-xs">
              Google Play Badge
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
