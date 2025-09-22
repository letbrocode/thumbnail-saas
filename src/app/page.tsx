"use server";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import PricingCard from "~/components/pricing-card";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const user = await auth();
  return (
    <div className="flex h-screen flex-col items-center overflow-y-scroll px-6 py-6">
      <nav className="flex w-full items-center justify-between pb-6 md:px-8">
        <Link href="/" className="text-lg leading-7 font-semibold">
          Thumbnails
        </Link>
        <div className="flex items-center">
          {user?.user ? (
            <Button>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          ) : (
            <Button>
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
      <div className="mt-2 flex flex-col gap-20 md:mt-14">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-10">
          <div className="flex max-w-2xl flex-col gap-1 md:w-1/2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Easier thumbnails <br /> for creators
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Thumbnails with text behind the foreground are popular, but takes
              time to make manually. Generate them automatically with this tool.
            </p>
            {user?.user ? (
              <Button className="mt-6 w-full md:w-fit">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            ) : (
              <Button className="mt-6 w-full md:w-fit">
                <Link href="/signup">Get a Free Thumbnail</Link>
              </Button>
            )}
          </div>
          <Image
            className="mt-6 max-w-full rounded-lg shadow-md md:w-1/2 md:max-w-xl"
            src="/style1.png"
            width={800}
            height={800}
            loading="eager"
            alt={"Demo"}
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
            Pricing
          </h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <PricingCard pricing="$2" credits="10" />
            <PricingCard pricing="$5" credits="25" />
            <PricingCard pricing="$10" credits="100" />
          </div>
        </div>
      </div>
    </div>
  );
}
