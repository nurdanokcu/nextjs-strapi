import Link from "next/link"
import {TeamMember} from "@/types/api/team"
import type { Metadata } from 'next'
import { fetchStrapiData } from "@/lib/api";
import Image from "next/image";

async function getAllTeamMembers() {
  const data = await fetchStrapiData("team-members?populate=*");
  return data ? data.data : [];
}

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the team behind Rovo It Solutions.',
}

export default async function Page() {
  const members: TeamMember[] = await getAllTeamMembers();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div>
      <h1 className="text-4xl mb-6 font-bold text-gray-700">Our Team</h1>
      <div className="grid grid-cols-2 gap-6">
        {members.map(member => {
          return (
            <Link
              className="group grid grid-cols-[140px_1fr] bg-white shadow rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
              key={member.id}
              href={`/our-team/${member.slug}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  alt={member.name}
                  width={140}
                  height={140}
                  className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                  src={`${baseUrl}${member.photo.formats.thumbnail.url}`}
                />
              </div>

              <div className="p-4">
                <p className="text-xl text-gray-600 font-bold group-hover:text-gray-700">{member.name}</p>
                <p className="text-sm text-gray-500 leading-6 line-clamp-5">{member.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
