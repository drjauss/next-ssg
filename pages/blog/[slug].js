import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Head from "next/head";

const Post = ({ content, data }) => {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");

  return {
    paths: files.map((filename) => ({
      params: {
        slug: filename.replace(".md", ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markDownWithMeta = fs.readFileSync(path.join("posts", slug + ".md")).toString();

  const { content, data } = matter(markDownWithMeta);
  const htmlString = marked(content);

  return {
    props: {
      content: htmlString,
      data,
    },
  };
};

export default Post;
