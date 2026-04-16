import SignUpForm from "@/app/(auth)/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-lg">
        <SignUpForm />
      </div>
    </div>
  );
}