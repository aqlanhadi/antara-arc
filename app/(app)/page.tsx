import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "@/components/shared/auth-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import MasonryFeed from "@/components/layout/masonry-feed";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const sampleJSONImage = [
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg", promoted: true },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg", promoted: true },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" },
    { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" }
  ]

  return (
    <>
        {/* <p>{JSON.stringify(session)}</p>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton /> */}

        <div className="flex-col text-6xl px-14 max-w-2xl m-auto my-10">
          <p className="font-crimson">wedding inspiration</p>
          <p className="font-crimson italic text-right text-primary">made by brides</p>
        </div>
        <div className="flex-col p-5">
          <p className="font-crimson text-xl text-primary">Discover brides</p>
          <div className="flex gap-1.5">
            {
              ["All", "Wedding", "Engagement", "Honeymoon", "Bridal Shower", "Bachelor"].map((item, index) => (
                <p key={index} className="px-2 py-0.5 text-sm border rounded-full">{item}</p>
              ))
            }
          </div>
        </div>
        <MasonryFeed content={sampleJSONImage}/>
    </>
  );
}
