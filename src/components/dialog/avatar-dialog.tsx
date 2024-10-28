"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { token } from "@/src/lib/constants";

const avatars = [
	{
		id: 1,
		name: 'Classic',
		free: true,
		url: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133925.jpg?t=st=1730133153~exp=1730136753~hmac=b1e262ec717ab51224779ed81a7930ae1fd6644abbc449bd233f1890c6cdb310&w=2000',
	},
	{
		id: 2,
		name: 'Cyber Batsman',
		free: true,
		url: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133925.jpg?t=st=1730133153~exp=1730136753~hmac=b1e262ec717ab51224779ed81a7930ae1fd6644abbc449bd233f1890c6cdb310&w=2000',
	},
	{
		id: 3,
		name: 'Neon Bowler',
		free: false,
		price: 100,
		url: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133925.jpg?t=st=1730133153~exp=1730136753~hmac=b1e262ec717ab51224779ed81a7930ae1fd6644abbc449bd233f1890c6cdb310&w=2000',
	},
	{
		id: 4,
		name: 'Holographic Captain',
		free: false,
		price: 200,
		url: 'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133925.jpg?t=st=1730133153~exp=1730136753~hmac=b1e262ec717ab51224779ed81a7930ae1fd6644abbc449bd233f1890c6cdb310&w=2000',
	},
];

export function AvatarDialog({
  currentAvatar,
  setCurrentAvatar,
  onClose,
}: {
  currentAvatar: number;
  setCurrentAvatar: any;
  onClose: any;
}) {
  const handleAvatarChange = (direction: "prev" | "next") => {
    setCurrentAvatar((prev: number) => {
      if (direction === "prev") {
        return prev > 1 ? prev - 1 : avatars.length;
      } else {
        return prev < avatars.length ? prev + 1 : 1;
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select Avatar</DialogTitle>
      </DialogHeader>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAvatarChange("prev")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="relative">
          <Image
            src={avatars[currentAvatar - 1].url}
            alt={avatars[currentAvatar - 1].name}
            height={80}
            width={80}
            className="w-24 h-24 rounded-full"
          />
          {!avatars[currentAvatar - 1].free && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
              {avatars[currentAvatar - 1].price} {token.symbol}
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleAvatarChange("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-center mb-4">{avatars[currentAvatar - 1].name}</p>

      <Button className="w-full rounded-xl" variant="default">
        Choose Avatar
      </Button>
    </DialogContent>
  );
}
