import { Mail, Users, FileText, Bookmark, Camera } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../components/context/UserContext";
import { getUserPosts } from "../../services/post.services";
import { getNewsFeed } from "../../services/newsfeed.services";
import type { PostCardI } from "../../types/postCard";
import PostCard from "../../components/Post/PostCard";
import AddPost from "../../components/Post/AddPost";
import PostSkeleton from "../../components/Post/PostCardSkeleton";

export default function Profile({ showMyPosts = false }: { showMyPosts?: boolean }) {

const { userData } = useContext(userContext)!
const [userPosts, setUserPosts] = useState<PostCardI[]>([]);
const [savedPosts, setSavedPosts] = useState<PostCardI[]>([]);
const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
const [postsCount, setPostsCount] = useState(0);
const [isLoading, setIsLoading] = useState(true);



async function getPosts() 
{ if (!userData?._id)
   return;
   setIsLoading(true);
   try {
     const {data} = await getUserPosts(userData._id);
     setUserPosts(data.data.posts);
      setPostsCount(data.data.posts .length); }
       catch (error)
        { console.log(error); } 
       finally {
         setIsLoading(false);
       }
      } 
      

useEffect(() => {
  getPosts();
  getSavedPosts();
}, [userData?._id]);

async function getSavedPosts() {
  try {
    const { data } = await getNewsFeed();
    setSavedPosts(
      data.data.posts.filter((post: PostCardI) => post.bookmarked)
    );
  } catch (error) {
    console.log(error);
  }
}

function showSavedPosts() {
  setActiveTab("saved");
  getSavedPosts();
}



  return showMyPosts ? (
    <div className="w-full">
      <AddPost refetchPosts={getPosts} />
      {isLoading ? (
        <PostSkeleton />
      ) : userPosts.length === 0 ? (
     <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="text-slate-500">
            No posts yet. Be the first one to publish.
          </p>
        </div>
      ) : (
        userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refetchPosts={getPosts}
          />
        ))
      )}
    </div>
  ) : (
    <main>
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
        {/* Header card */}
        <div className="overflow-hidden rounded-3xl bg-white pb-10 shadow-lg">
          {/* Cover */}
          <div className="relative h-40 bg-linear-to-br from-sky-900 via-slate-600 to-slate-400 sm:h-64 lg:h-80">
            <button className="absolute right-3 top-3 flex items-center gap-2 rounded-xl bg-slate-900/50 px-3 py-2 text-xs font-bold text-white backdrop-blur hover:bg-slate-900/70 sm:right-6 sm:top-6 sm:px-4 sm:py-2.5 sm:text-sm">
              <Camera size={18} />
              Add cover
            </button>
          </div>

          {/* Profile card */}
          <div className="relative mx-5 -mt-12 rounded-3xl bg-linear-to-b from-slate-50 to-white p-4 shadow-lg sm:mx-6 sm:-mt-20 sm:p-6 lg:mx-12 lg:-mt-24 lg:p-8">
            {/* Identity + stats */}
            <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-600 ring-4 ring-white sm:h-30 sm:w-30 sm:text-5xl sm:ring-8">
                  <img src={userData?.photo} alt="userProfile" className="h-full w-full rounded-full object-cover" />      
                </div>

                <div>
                  <h2 className="truncate text-2xl font-bold text-slate-900 ms-1 sm:text-4xl">{userData?.name}</h2>
                  <p className="truncate text-base text-slate-400 ms-1 sm:text-xl">@{userData?.username}</p>

                  <span className="mt-2 flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-500">
                    <Users size={16} />
                    Route Posts member
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-6">
                <div className="min-w-0 rounded-2xl border border-slate-100 bg-white px-2 py-3 text-center shadow-sm sm:min-w-36 sm:px-6 sm:py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Followers
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{userData?.followersCount}</p>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-100 bg-white px-2 py-3 text-center shadow-sm sm:min-w-36 sm:px-6 sm:py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Following
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{userData?.followingCount}</p>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-100 bg-white px-2 py-3 text-center shadow-sm sm:min-w-36 sm:px-6 sm:py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Bookmarks
                  </p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{userData?.bookmarksCount}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* About */}
              <div className="rounded-2xl border border-slate-100 bg-slate-100 p-4 lg:col-span-2 lg:p-5">
                <h3 className="font-bold text-slate-900">About</h3>

                <div className="mt-4 flex items-center gap-3 text-slate-700">
                  <Mail size={18} className="text-slate-500" />
                  {userData?.email}
                </div>

                <div className="mt-3 flex items-center gap-3 text-slate-700">
                  <Users size={18} className="text-slate-500" />
                  Active on Route Posts
                </div>
              </div>

              {/* Counters */}
              <div className="flex flex-col gap-5 sm:flex-row lg:col-span-1 lg:flex-col">
                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-900">
                    My posts
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{postsCount}</p>
                </div>

                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-900">
                    Saved posts
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{savedPosts.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-2 shadow-lg sm:p-3">
          <div className="flex w-full items-center gap-1 rounded-2xl bg-slate-100 p-1 sm:w-auto">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex flex-1 items-center justify-center gap-2 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-bold sm:flex-none sm:px-5 sm:py-3 sm:text-base ${activeTab === "posts"
                ? "bg-white text-blue-500 shadow-sm"
                : "text-slate-700 hover:bg-slate-200"
                }`}
            >
              <FileText size={20} />
              My Posts
            </button>

            <button
              onClick={showSavedPosts}
              className={`flex flex-1 items-center justify-center gap-2 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-bold sm:flex-none sm:px-5 sm:py-3 sm:text-base ${activeTab === "saved"
                ? "bg-white text-blue-500 shadow-sm"
                : "text-slate-700 hover:bg-slate-200"
                }`}
            >
              <Bookmark size={20} />
              Saved
            </button>
          </div>

          <span className="mr-3 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-500">
            {activeTab === "posts" ? postsCount : savedPosts.length}
          </span>
        </div>

        {/* Posts */}
        <div className="mt-5">
  {activeTab === "posts" ? (
    userPosts.length === 0 ? (
      <div className="rounded-3xl bg-white p-6 text-center text-slate-500 shadow-lg">
        You have not posted yet.
      </div>
    ) : (
      <div>
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refetchPosts={getPosts}
          />
        ))}
      </div>
    )
  ) : savedPosts.length === 0 ? (
    <div className="rounded-3xl bg-white p-6 text-center text-slate-500 shadow-lg">
      You have not saved any posts yet.
    </div>
  ) : (
    <div>
      {savedPosts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refetchPosts={getSavedPosts}
        />
      ))}
    </div>
  )}
</div>
      </div>
    </main>
  );
}
