import { AppLogo } from "@/components/brand/AppLogo";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col justify-center bg-[#04110d] px-4 py-8">
      <div className="panel mx-auto w-full max-w-md rounded-3xl p-6">
        <div className="mb-6 flex justify-center">
          <AppLogo className="w-15 h-15 rounded-2xl" size="sm" priority />
        </div>
        {children}
      </div>
    </div>
  );
}
