import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";

import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import View from "@/components/View";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;

  const [startup, { select: editorPicks }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {
      id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!startup) return notFound();

  const parsedContent = md.render(startup.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(startup?._createdAt)}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>

      <section className="section_container">
        <img
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={
                  startup.author?.image ||
                  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                }
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{startup.author?.name}</p>
                <p className="text-16-medium">{startup.author?.username}</p>
              </div>
            </Link>

            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        {editorPicks.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>
            <ul className="mt-7 card_grid-sm">
              {editorPicks.map((pick: StartupTypeCard) => (
                <StartupCard key={pick._id} post={pick} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <View id={id} />
    </>
  );
};

export default page;
