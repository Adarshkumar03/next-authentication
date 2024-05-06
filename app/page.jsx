"use client";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const topics = [
  {
    id: 1,
    title: "Introduction to Rocket Science",
    content:
      "Covers fundamentals, design, construction, operation and programming of robots.",
    img: "/rocket.png",
  },
  {
    id: 2,
    title: "Astro Physics",
    content:
      "Covers fundamentals, design, construction, operation and programming of robots.",
    img: "/atom.png",
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    content:
      "Covers fundamentals, design, construction, operation and programming of robots.",
    img: "/ai.png",
  },
];

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log({ user });
  if (!user) {
    router.push("/sign-up");
    return null;
  }

  const items = topics.map((topic) => (
    <div
      className="flex flex-col justify-between rounded-lg shadow-md border-solid border-2 border-gray-700 p-5"
      key={topic.id}
    >
      <div className="flex mb-4">
        <img
          src={topic.img}
          alt="Topic 1"
          className="w-1/3 object-cover h-30 mr-r"
        />
        <div className="p-4 flex flex-col justify-between w-2/3">
          <h3 className="text-lg font-medium">{topic.title}</h3>
          <p className="text-gray-400">{topic.content}</p>
        </div>
      </div>
      <button className="rounded-lg shadow-md border-solid border-2 border-gray-700 p-3 hover:bg-gray-600 font-bold">
        READ
      </button>
    </div>
  ));

  return (
    <div className="bg-[#192734] text-white md:h-screen">
      <header className="flex justify-between items-center px-10 py-4">
        <div>
          <img src="/logo.png" />
        </div>
        <button
          onClick={() => signOut(auth)}
          className="px-4 py-2 text-xl text-[#00b2ff] font-bold rounded hover:text-white"
        >
          Sign Out
        </button>
      </header>
      <div className="border-b border-gray-600"></div>
      <main className="container mx-auto px-12 py-10">
        <h1 className="text-2xl font-semibold mb-8 tracking-wide">
          Popular Topics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items}
          {/* Add more grid items as needed */}
        </div>
      </main>
    </div>
  );
}
