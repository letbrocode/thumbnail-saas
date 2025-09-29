"use server";
import React from "react";
import { Separator } from "./ui/separator";
import { auth } from "~/server/auth";
import AWS from "aws-sdk";
import { env } from "~/env";
import DownloadRecentThumbnail from "./download-recent-thumbnail";

const Recent = async () => {
  const serverSesssion = await auth();
  const s3 = new AWS.S3({
    accessKeyId: env.MY_AWS_ACCESS_KEY,
    secretAccessKey: env.MY_AWS_SECRET_KEY,
    region: env.MY_AWS_REGION,
  });

  const prefix = `${serverSesssion?.user.id}/`;

  const params = {
    Bucket: env.MY_AWS_BUCKET_NAME,
    Prefix: prefix,
    MaxKeys: 10,
  };

  const data = await s3.listObjectsV2(params).promise();

  const recentThumbnails = data.Contents?.sort((a, b) => {
    const dateA = new Date(a.LastModified ?? 0).getTime();
    const dateB = new Date(b.LastModified ?? 0).getTime();
    return dateA - dateB;
  }).map((item) => ({
    url: `https://${env.MY_AWS_BUCKET_NAME}.s3.${env.MY_AWS_REGION}.amazonaws.com/${item.Key}`,
    createdAt: item.LastModified ?? new Date(),
    key: item.Key!,
  }));

  return (
    <div className="flex flex-col">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Recent thumbnails
      </h3>
      <p className="text-muted-foreground text-sm">
        Download your recent thumbnails.
      </p>
      <Separator className="my-2" />
      {recentThumbnails?.length === 0 ? (
        <p className="text-muted-foreground text-sm">No recent thumbnails.</p>
      ) : (
        <div className="flex h-fit max-w-full gap-2 overflow-x-scroll">
          {recentThumbnails?.map((thumbnail) => (
            <div className="flex min-w-fit flex-col gap-1" key={thumbnail.key}>
              <img
                src={thumbnail.url}
                alt="image"
                className="h-56 w-auto rounded-lg object-contain"
              />
              <p className="text-sm">
                From{" "}
                {new Date(thumbnail.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <DownloadRecentThumbnail url={thumbnail.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recent;
