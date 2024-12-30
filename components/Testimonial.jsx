import { BASE_URL } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Testimonial(props) {
  return (
    <div className="bg-gray-200 rounded-lg py-6 px-16 pb-20 not-prose mb-24 relative text-center">
      <p className="text-2xl italic text-gray-600">
        &ldquo;{props.data.quote}&rdquo;
      </p>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        {props.data.photo?.formats?.thumbnail?.url ? (
          <Image
            className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
            src={`${BASE_URL}${props.data.photo.formats.thumbnail.url}`}
            alt={props.data.authorName}
            width={128}
            height={128}
          />
        ) : (
          <Avatar className="w-32 h-32 border-4 border-gray-200">
            <AvatarFallback>
              {props.data.authorName ? props.data.authorName[0] : "A"}
            </AvatarFallback>
          </Avatar>
        )}
        <h4 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 shadow px-3 py-2 text-sm font-bold rounded-full text-gray-800">
          {props.data.authorName}
        </h4>
      </div>
    </div>
  );
}
