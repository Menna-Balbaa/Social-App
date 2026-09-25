import { useEffect, useState } from "react";
import { useOutlet } from "react-router";
import PostCard from "../../components/Post/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestionsSidebar from "../../components/SuggestionsSidebar/SuggestionsSidebar";
import { getNewsFeed } from "../../services/newsfeed.services";
import type { PostCardI } from "../../types/postCard";
import PostSkeleton from "../../components/Post/PostCardSkeleton";
import AddPost from "../../components/Post/AddPost";

export default function NewsFeed() {
  const [posts, setPosts] = useState<PostCardI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const outlet = useOutlet({
    posts,
    getPosts,
    isLoading,
  });

  async function getPosts() {
    try {
      const { data } = await getNewsFeed();

      const posts: PostCardI[] = data.data.posts;

      setPosts(posts);
    } catch (error) {
      console.log(error);

      setErrorMsg(
        "Something went wrong. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="bg-[#F0F2F5]">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:p-11">
        <div className="grid grid-cols-12 gap-5">

          {/* Sidebar */}
          <div className="order-1 col-span-12 h-fit lg:order-0 lg:sticky lg:top-33 lg:col-span-3">
            <Sidebar />
          </div>

          {/* Middle Content */}
          <div className="order-3 col-span-12 min-w-0 lg:order-0 lg:col-span-6">
            {outlet ? (
              outlet
            ) : (
              <>
                <AddPost refetchPosts={getPosts} />

                {isLoading ? (
                  <PostSkeleton />
                ) : errorMsg ? (
                  <div className="flex min-h-100 items-center justify-center">
                    <p className="m-auto rounded-lg bg-white p-6 text-center text-red-500">
                      {errorMsg}
                    </p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      refetchPosts={getPosts}
                    />
                  ))
                )}
              </>
            )}
          </div>

          {/* Suggestions Sidebar */}
          <div className="order-2 col-span-12 h-fit lg:order-0 lg:sticky lg:top-33 lg:col-span-3">
            <SuggestionsSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}