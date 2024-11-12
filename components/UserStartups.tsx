import React from "react";

import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const userStartups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {
    authorId: id,
  });

  console.log("userStartups", userStartups);
  return (
    <>
      {userStartups.length > 0 ? (
        userStartups.map((userStartup: StartupTypeCard) => (
          <StartupCard key={userStartup._id} post={userStartup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
