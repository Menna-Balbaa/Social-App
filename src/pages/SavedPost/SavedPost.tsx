import { useOutletContext } from "react-router";
import PostCard from "../../components/Post/PostCard";
import type { PostCardI } from "../../types/postCard";
import AddPost from "../../components/Post/AddPost";
import PostSkeleton from "../../components/Post/PostCardSkeleton";

export default function SavedPosts() {
  const { posts, getPosts, isLoading } = useOutletContext<{
    posts: PostCardI[];
    getPosts: () => Promise<void>;
    isLoading: boolean;
  }>();

  const savedPosts = posts.filter((post) => post.bookmarked);

  return (

    <>
      <AddPost refetchPosts={getPosts} />

      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div>
          {savedPosts.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
              <p className="text-slate-500">
                You haven't saved any posts yet.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                refetchPosts={getPosts}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}