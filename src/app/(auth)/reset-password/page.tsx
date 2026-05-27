import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthLayout
        title="Fresh Start, Same You."
        subtitle="Create a new password and continue your academic journey."
      />
      <section className="bg-bg w-full flex flex-col items-center gap-12 absolute md:relative top-100 bottom-0 md:top-0 left-0 rounded-tl-3xl rounded-tr-3xl md:rounded-none pt-8 md:pt-12 lg:pt-15">
        <ResetPasswordForm />
        <Footer />
      </section>
    </div>
  );
}
