import Link from "next/link";
import { Button } from "~/components/ui/button";

function NotFoundPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-10 py-10">
      <div className="flex flex-col items-center gap-4">
        <h1>The page you&apos;re looking for doesn&apos;t exist.</h1>
        <Link href="/dashboard">
          <Button>Go back</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
