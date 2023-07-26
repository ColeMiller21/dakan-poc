"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { s3 } from "@/lib/s3/s3Client";
import Image from "next/image";
import { awsConfig } from "@/config/aws";

interface Image {
  key?: string;
  url?: string;
}

const bucketName = "poc-dakan";
const prefix = "profile-image/";

export function DisplayImages() {
  const [images, setImages] = useState<Image[]>([]);

  const handleImages = async () => {
    const params = {
      Bucket: awsConfig.bucketName,
      Prefix: awsConfig.profileImagePrefix,
    };
    const data = await s3.listObjectsV2(params).promise();

    const imageArray: Image[] = data
      .Contents!.map((item) => ({
        key: item.Key,
        url: `https://${
          awsConfig.bucketName
        }.s3.amazonaws.com/${encodeURIComponent(item.Key as string)}`,
      }))
      .filter((img: Image) => img.key !== "profile-image/");
    setImages(imageArray);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={handleImages}>Get Image</Button>
      <div className="w-full flex justify-center items-center gap-12">
        {images.map((img: Image) => {
          return (
            <Image
              src={img.url as string}
              alt={img.url as string}
              key={img.key as string}
              width={300}
              height={300}
            />
          );
        })}
      </div>
    </div>
  );
}
