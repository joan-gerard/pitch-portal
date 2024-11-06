// import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
// import type { StartupTypeCard } from "@/components/StartupCard";
import type { TestType } from "@/components/StartupCard";
// import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: "22/10/24",
      views: 55,
      author: {
        _id: 1,
        name: "Bob",
      },
      _id: 1,
      description: "This is a description",
      category: "Robots",
      title: "We Robots",
      image: "https://placehold.co/600x400",
    },
  ];
  // Original data fetch
  // const posts = await client.fetch(STARTUPS_QUERY);

  // New fetch using Live Content API
  // const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            <>
              {posts.map((post: TestType) => (
                <StartupCard post={post} key={post?._id} />
              ))}
            </>
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      {/* <SanityLive /> */}
    </>
  );
}
