import { BASE_URL, fetchStrapiData } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import type { Metadata } from 'next'

async function fetchTeamMember(slug: string) {
  const ourQuery = qs.stringify({
    filters: { slug: slug },
    populate: {
      bodyContent: {
        on: {
          "features.spoiler": { populate: "*" },
          "features.testimonial": { populate: "*" },
          "features.text-editor": { populate: "*" },
        },
      },
      photo: true,
    },
  });

  const membersPromise = await fetchStrapiData(`team-members?${ourQuery}`);
  return membersPromise.data[0];
}

function renderComponent(item, index: number) {
  if (item.__component === "features.testimonial") {
    return <Testimonial key={index} data={item} />;
  }

  if (item.__component === "features.spoiler") {
    return <Spoiler key={index} data={item} />;
  }

  if (item.__component === "features.text-editor") {
    return (
      <div
        key={index}
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: item.tiny_editor
        }}
      />
    );
  }
  
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const member = await fetchTeamMember(slug);
  console.log(member);

  if (!member) {
    return {
      title: "Team Member Not Found",
      description: "The requested team member does not exist.",
    };
  }

  return {
    title: member.name,
    description: `Learn more about ${member.name}, a key member of our team.`,
  };
}
export async function generateStaticParams() {
  const membersPromise = await fetchStrapiData("team-members?populate=*");
  const members = await membersPromise;
  return members.data.map((member) => {
    return {
      slug: member.slug,
    };
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = (await params);
  const member = await fetchTeamMember(slug);

  if (!member) {
    return <div>Error: Team member data not found</div>;
  }
  
  return (
    <div>
      <div className="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
        <h2 className="text-6xl font-bold relative z-30">{member.name}</h2>
        <Image
          className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
          src={`${BASE_URL}${member.photo.formats.thumbnail.url}`}
          alt={member.name}
          width={500}
          height={500}
        />
        <div className="absolute z-20 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div>
      </div>

      <div className="transform -translate-y-1/2">
        <Link
          href="/our-team"
          className="text-sm bg-gray-600 text-gray-400 hover:bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5"
        >
          &laquo; Back to all team members
        </Link>
      </div>

      <div className="prose max-w-none flex flex-col gap-12">
        {member.bodyContent.map((item, index) => renderComponent(item, index))}
      </div>
    </div>
  );
}
