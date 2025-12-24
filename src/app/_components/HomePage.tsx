import { useAuth, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  console.log("User info:", user);

  async function createProduct() {
    const token = await getToken();

    console.log("Auth Token:", token);
  }

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center"></div>
  );
}
