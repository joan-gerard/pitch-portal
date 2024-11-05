# pitch-portal

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Steps

## Auth with NextAuth

At the root of the project, create an file called `auth.ts`

```
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
});
```

Add handlers in `app/api/auth/[...nextauth]/route.ts`

```
import { handlers } from "@/auth";

export const {GET, POST} = handlers
```

import the functions in your projects and get the `session` object

```
import { auth, signIn, signOut } from "@/auth";

const session = await auth();
```

## Theming and Fonts

Add custom themes to the `tailwing.config` file.

For fonts, add `ttf`files to the `fonts`folder. Then in the root layout file, add the newly imported fonts to the `localFont` object and give it a variable name

```
const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

```

## Utility classes

In the `global.css` file, you can add the `@layer utilities` directive and create custom CSS classes using Tailwind

```css
@layer utilities {
  .heading {
    @apply uppercase bg-black px-6 py-3 font-work-sans;
  }
}
```

## Sanity

With Sanity, you can leverage their APIs to build a whole OS around the content. Sanity integrates very well with Next.js

### Setup

run this cmd to initialize the project with the CLI

```bash
npm create sanity@latest -- --project [projectID] --dataset production --template clean
```

### Studio

To enter the studio add `/studio` to the url

### Workflow

![Alt text](public/sanity-workflow.png)

### Schema

Inside `sanity/schemaTypes` folder, create new files called `author.ts` and `startup.ts` and add the following declaration

```javascript
import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: '"name',
    },
  },
});
```

```javascript
export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(20).required().error("Please enter a categoty"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

Add the schema name to the `types` array in the `sanity/schemaTypes/index.ts` file
