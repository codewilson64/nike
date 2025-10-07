import "../globals.css";
import Image from "next/image";
import logo from "../../../public/logo.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="h-screen w-screen font-jost">
        <div className="flex h-full flex-col lg:flex-row">
          {/* Left Panel */}
          <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-10">
            <div>
              <Image src={logo} alt="Nike Logo" width={40} height={40} />
            </div>
            <div className="px-6">
              <h2 className="text-4xl font-bold mb-4">Just Do It</h2>
              <p className="text-lg text-gray-300">
                Join millions of athletes and fitness enthusiasts who trust
                Nike for their performance needs.
              </p>
            </div>
            <p className="text-sm text-gray-500">© 2025 Nike. All rights reserved.</p>
          </div>

          {/* Right Panel */}
          <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 lg:px-16">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
  );
}
