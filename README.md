# Welcome to zirkelc.dev
This is the repository of my personal blog, [zirkelc.dev](https://zirkelc.dev). The site is built using [Notion](https://notion.so) as the Content Management System (CMS), [Next.js](https://nextjs.org/) as the React framework and [Tailwind CSS](https://tailwindcss.com/) for the styling. 

# Before You Start
This project is **strongly inspired** by the following two articles. If you're interested in how it works, I highly recommend you to check out these great resources:
- [Building a Notion Blog with Public API](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api) by [Samuel Kraft](https://samuelkraft.com/)
- [How to Create a Next.js Blog Using Notion as a CMS](https://bejamas.io/blog/how-to-create-next-js-blog-using-notion-as-a-cms/) by [Bejamas](https://bejamas.io/)

# Notion Setup

1. Create a Notion database with the following fields:
   - `Name`: The title of the blog post. 
   - `Slug`: The slug of a post (type `Text`).
   - `Tags`: The tags of a post (type `Multi-select`).
   - `Date`: The date the post was published (type `Date`).
   - `IsProduction`: Indicates whether the post is live in production or not (type `Checkbox`). 
   - `IsDevelopment`: Indicates whether the post is live in development or not (type `Checkbox`).

See this template for reference: [Notion database template](https://zirkelc.notion.site/Template-d22e395bb09c4229bc7c968b46a5acbc?pvs=4)

2. Follow [Notion's getting started guide](https://developers.notion.com/docs/create-a-notion-integration) to create an integration and share your database with it. This will give you a `NOTION_TOKEN` and a `DATABASE_ID`. Create a `.env.local` file in the root directory of the project and add these keys:

```
NOTION_TOKEN=your_token_here
DATABASE_ID=your_database_id_here
```

3. Create a new page in Notion in your database and fill out all fields. Make sure to set the `IsDevelopment` field to `true` to be able to see the post in development.

The fields `IsProduction` and `IsDevelopment` are used to filter posts in development and production. If you have lots of posts, this helps to reduce the number of static pages that are generated in development. The environment is determined by the `process.env.NODE_ENV` variable and is set automatically by Next.js.

# Local Development

To get this running locally on your machine, follow these steps:

1. Fork this repository and give it a new name.
   
2. Clone this repository:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
```

3. Install the dependencies:
```bash
npm install
# or 
yarn 
# or
pnpm install
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Now you should be able to see the project running at [localhost:4000](https://localhost:4000) in your browser.


# Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzirkelc%2Fzirkelc.dev&env=NOTION_TOKEN,DATABASE_ID)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.