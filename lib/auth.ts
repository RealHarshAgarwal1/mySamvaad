import { currentUser } from "@clerk/nextjs/server";
import { getUser, createOrUpdateUser } from "@/server/actions/user.actions";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const clerkUser = await currentUser();
  if (!clerkUser) return;

  let user = await getUser(clerkUser.id);
  
  // If user doesn't exist, create them
  if (!user) {
    try {
      await createOrUpdateUser({
        id: clerkUser.id,
        email_addresses: clerkUser.emailAddresses.map(email => ({
          email_address: email.emailAddress
        })),
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        image_url: clerkUser.imageUrl || "",
        username: clerkUser.username,
      });
      user = await getUser(clerkUser.id);
    } catch (error) {
      console.error("Error creating user in auth:", error);
    }
  }
  
  if (user) redirect("/feed");
}