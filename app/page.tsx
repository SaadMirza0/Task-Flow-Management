import { SignIn,Show,UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return (
<main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
  <Show when="signed-out">
       <SignInButton mode="modal">
            <button className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50">
              Login
            </button>
          </SignInButton>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <SignUpButton mode="modal">
            <button className="bg-[#6c47ff] text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90">
              Get Started for Free
            </button>
          </SignUpButton>
  </Show>

 

      <Show when="signed-in">
             <h1 className="text-4xl font-bold mb-4">Task Flow Management</h1>
      <p className="text-gray-600 mb-8">Simple way to track your daily work.</p>
            <UserButton />
          </Show>

      {/* Logic for Logged In Users (Redirect to Dashboard) */}
  
    </main>
  );
}
