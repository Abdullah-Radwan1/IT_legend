// Root page – redirects to the Courses listing page

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/courses");
}
