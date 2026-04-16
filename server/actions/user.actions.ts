'use server'

import prisma from "@/lib/prisma";


export type ClerkWebhookUserData = {
  id: string;
  email_addresses: { email_address: string }[];
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
};

export type ClerkWebhookDeleteData = {
  id: string;
};

export async function getUser(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function createOrUpdateUser(data: ClerkWebhookUserData) {
  try {
    const email = data.email_addresses[0]?.email_address;
    const username = data.username ?? email.split("@")[0];
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

    const user = await prisma.user.upsert({
      where: { clerkId: data.id },
      create: {
        clerkId: data.id,
        email,
        username,
        name,
        image: data.image_url,
      },
      update: {
        email,
        username,
        name,
        image: data.image_url,
      },
    });

    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating or updating user:", message);
    throw new Error(`Failed to create or update user: ${message}`);
  }
}

export async function deleteUser(data: ClerkWebhookDeleteData) {
  try {
    await prisma.user.delete({
      where: { clerkId: data.id },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting user:", message);
    throw new Error(`Failed to delete user: ${message}`);
  }
}