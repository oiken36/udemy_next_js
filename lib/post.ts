import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), "posts");


export type postData = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    }
  });
  return allPostData;
}

// getStaticPathで使うパスを返す
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      }
    }
  });
}

// idに基づいてブログデータを取得
export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  /**markdown to html */
  const blogConent = await remark()
    .use(html)
    .process(matterResult.content);

  const blogConentHTML = blogConent.toString();
  return {
    id,
    blogConentHTML,
    ...matterResult.data
  }

}