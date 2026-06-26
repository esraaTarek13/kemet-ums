import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthLayout
        title="Your Campus, Your Way."
        subtitle="Seamless access to everything that matters — anytime, anywhere."
      />
      <section className="bg-bg w-full h-fit md:h-full flex flex-col items-center gap-12 absolute md:relative top-100 bottom-0 md:top-0 left-0 rounded-tl-3xl rounded-tr-3xl md:rounded-none pt-8 md:pt-12 lg:pt-15">
        <LoginForm />
        <Footer />
      </section>
    </div>
  );
}
