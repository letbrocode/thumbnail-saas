"use server";

import { revalidatePath } from "next/cache";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export const generate = async () => {
  const serverSession = await auth();
  await db.user.update({
    where: {
      id: serverSession?.user.id,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });
};

export const refresh = async () => {
  revalidatePath("/dashboard");
};
