import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Required with cacheComponents: the catch-all reads the request. */}
      <Suspense>
        <SignUp />
      </Suspense>
    </div>
  );
}
