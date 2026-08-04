import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const socials = [
  {
    name: "Facebook",
    icon: (
      <path d="M15 8.5h-2a1 1 0 00-1 1V12h3l-.5 3H12v6H9v-6H7v-3h2V9a4 4 0 014-4h2v3.5z" />
    ),
  },
  {
    name: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#0B1E33" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="1" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8.5" r="1.5" fill="#0B1E33" />
        <rect x="6.75" y="11" width="2.5" height="8" fill="#0B1E33" />
        <path d="M12 11h2.3v1.3c.5-.8 1.5-1.5 2.9-1.5 2.2 0 3.3 1.4 3.3 4V19h-2.5v-3.7c0-1.1-.4-1.9-1.5-1.9-1 0-1.6.7-1.6 1.9V19H12v-8z" fill="#0B1E33" />
      </>
    ),
  },
];

interface FooterProps {
  onSubscribe?: (email: string) => void;
}

export default function Footer({ onSubscribe }: FooterProps) {
  return (
    <footer className={`${inter.className} bg-[#0B1E33] rounded-t-[3rem] mt-10 pt-14 pb-8 px-4 sm:px-6 md:px-10`}>
      <div className="max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white font-semibold text-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 3l9 7.5V21a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1v-10.5L12 3z" />
            </svg>
            Listing Signal
          </div>
          <p className="text-white/50 text-sm mt-3 max-w-xs">
            Real-time home value insights powered by live data and AI.
          </p>
          <p className="text-white/70 text-sm mt-5">Follow us</p>
          <div className="flex items-center gap-3 mt-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="shrink-0 mt-0.5">
            <path
              d="M12 2L4.5 5V10.5C4.5 15.2 7.6 19.5 12 21.5C16.4 19.5 19.5 15.2 19.5 10.5V5L12 2Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <p className="text-white text-sm font-semibold">Your data is secure</p>
            <p className="text-white/50 text-sm mt-1">
              We use bank-level encryption to protect your information.
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white/5 rounded-xl p-5">
          <p className="text-white text-sm font-semibold">Stay Updated</p>
          <p className="text-white/50 text-sm mt-1">
            Get local market updates and tips straight to your inbox.
          </p>
          <form
            className="flex items-center mt-4 bg-white/10 rounded-full pl-4 pr-1.5 py-1.5"
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
              onSubscribe?.(email);
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="bg-transparent text-white placeholder:text-white/40 text-sm flex-1 outline-none min-w-0"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="w-8 h-8 rounded-full bg-[#1FAE9F] flex items-center justify-center shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <p className="text-white/30 text-xs text-center mt-10">
        © {new Date().getFullYear()} Listing Signal. All rights reserved.
      </p>
    </footer>
  );
}