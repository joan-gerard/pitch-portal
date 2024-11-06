import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const id = (await params)._id;

  const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!startup) return notFound();

  return (
    <>
      <h1>This is a startup number: {id} </h1>
      <h1>This is the startup title: {startup.title} </h1>
    </>
  );
};

export default page;
