import { Bookmark, Globe2, LucideEdit, MessageCircle, MoreHorizontal, Share2, ThumbsUp, Trash, } from "lucide-react";
import type { PostCardI } from "../../types/postCard";
import { Link } from "react-router";
import PostComment from "./PostComment";
import { useContext, useState } from "react";
import { AlertDialog, Button, Dropdown, Label, Spinner, useOverlayState, } from "@heroui/react";
import { userContext } from "../context/UserContext";
import EditPost from "./EditPost";
import EditComment from "./EditComment";
import { deletePost, likeAndUnlikePost, saveUnsavePost, } from "../../services/post.services";
import { deleteComment } from "../../services/comments.services";

export default function PostCard({ post, refetchPosts }: { post: PostCardI; refetchPosts: () => void; }) {

  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const { userData } = useContext(userContext)!;
  const [showEditPost, setShowEditPost] = useState<boolean>(false);
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);
  const deletePostDialog = useOverlayState();
  const deleteCommentDialog = useOverlayState();

  async function deleteUserPost() {
    setIsLoading(true);

    try {
      const { data } = await deletePost(post._id);

      console.log(data);

      deletePostDialog.close();
      refetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function likeUnlikePost() {
    try {
      const { data } = await likeAndUnlikePost(post._id);

      console.log(data);

      refetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUserComment() {
    if (!post.topComment?._id) return;

    setIsDeletingComment(true);

    try {
      const { data } = await deleteComment(
        post._id,
        post.topComment._id
      );

      console.log(data);

      deleteCommentDialog.close();
      refetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingComment(false);
    }
  }

  async function savePost() {
    try {
      const { data } = await saveUnsavePost(post._id);
      console.log(data);
      refetchPosts();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Delete Post Loading */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px]">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl">
            <Spinner
              className="text-red-600"
              size="lg"
            />

            <span className="text-base font-semibold text-slate-700">
              Deleting...
            </span>
          </div>
        </div>
      )}

      {/* Delete Comment Loading */}
      {isDeletingComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-[1px]">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-xl">
            <Spinner
              className="text-red-600"
              size="lg"
            />

            <span className="text-base font-semibold text-slate-700">
              Deleting comment...
            </span>
          </div>
        </div>
      )}

      <article className="mx-auto mb-4 w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Post Header */}
        <div className="flex items-start justify-between p-4">
          <div className="flex gap-3">
            <img
              src={post.user.photo}
              alt={post.user.name}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-slate-900">
                {post.user.name}
              </h2>

              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <span>{post.user.username}</span>

                <span aria-hidden="true">·</span>

                <span>
                  {new Date(
                    post.createdAt
                  ).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>

                <span aria-hidden="true">·</span>

                <Globe2
                  size={12}
                  aria-label="Public post"
                />

                <span className="mb-1">
                  {post.privacy}
                </span>
              </div>
            </div>
          </div>

          {/* Post Menu */}
          <Dropdown>
            <Button
              aria-label="Menu"
              variant="ghost"
            >
              <MoreHorizontal size={20} />
            </Button>

            <Dropdown.Popover placement="bottom end">
              <Dropdown.Menu
                onAction={(key) =>
                  console.log(`Selected: ${key}`)
                }
              >
                <Dropdown.Item
                  id="save-post"
                  textValue={
                    post.bookmarked ? "Unsave Post" : "Save Post"
                  }
                  onAction={savePost}
                >
                  <Label className="flex justify-between  gap-1">
                    <Bookmark size={18} className="mt-0.5" />
                    {post.bookmarked
                      ? "Unsave Post"
                      : "Save Post"}
                  </Label>
                </Dropdown.Item>

                {userData?._id === post.user._id && (
                  <>
                    <Dropdown.Item
                      onAction={() =>
                        setShowEditPost(true)
                      }
                      id="edit-file"
                      textValue="Edit file"
                    >
                      <Label className="flex justify-between  gap-1.5">
                        <LucideEdit size={18} className="mt-0.5 ms-0.5" />
                        Edit Post
                      </Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      onAction={deletePostDialog.open}
                      id="delete-file"
                      textValue="Delete file"
                      variant="danger"
                    >
                      <Label className="flex justify-between  gap-1.5 text-red-600">
                        <Trash size={18} className="mt-0.5 ms-0.5 text-red-600" />
                        Delete Post
                      </Label>
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>


          {!isLoading && (
            <AlertDialog.Backdrop
              isOpen={deletePostDialog.isOpen}
              onOpenChange={deletePostDialog.setOpen}
            >
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-100">
                  <AlertDialog.CloseTrigger />

                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />

                    <AlertDialog.Heading>
                      Delete post permanently?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>

                  <AlertDialog.Body>
                    <p>
                      This will permanently delete{" "}
                      <strong>Your Post</strong> and all
                      of its data. This action cannot be
                      undone.
                    </p>
                  </AlertDialog.Body>

                  <AlertDialog.Footer>
                    <Button
                      slot="close"
                      variant="tertiary"
                    >
                      Cancel
                    </Button>

                    <Button
                      onPress={deleteUserPost}
                      variant="danger"
                    >
                      Delete Post
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          )}
        </div>

        {/* Post Content / Edit Post */}
        {showEditPost ? (
          <EditPost
            setShowEditPost={setShowEditPost}
            post={post}
            refetchPosts={refetchPosts}
          />
        ) : (
          <>
            {post.body && (
              <p className="px-4 pb-4 text-sm leading-6 text-slate-700">
                {post.body}
              </p>
            )}

            {post.image && (
              <img
                src={post.image}
                alt="Post image"
                className="w-full object-cover"
              />
            )}
          </>
        )}

        <div className="px-4">

          {/* Engagement Counts */}
          <div className="flex items-center justify-between border-b border-slate-200 py-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                <ThumbsUp
                  size={12}
                  fill="currentColor"
                />
              </span>

              {post.likesCount} Likes
            </span>

            <div>
              <span className="me-1.5">
                {post.commentsCount} comments
              </span>

              <span className="me-2">
                {post.sharesCount} shares
              </span>

              <Link
                to={`/PostDetails/${post._id}`}
                className="mt-1 rounded-[5px] px-2 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-100"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Post Actions */}
          <div className="grid grid-cols-3 border-b border-slate-200 py-1">
            <button
              onClick={likeUnlikePost}
              type="button"
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium ${post.likes.includes(userData?._id!) &&
                "bg-blue-100 text-blue-500"
                }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full">
                <ThumbsUp size={18} />
              </span>

              Like
            </button>

            <button
              onClick={() =>
                setShowCommentInput(
                  !showCommentInput
                )
              }
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <MessageCircle size={18} />
              Comment
            </button>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>

          {/* Top Comment */}
          {post.topComment && (
            <div className="mt-4.5 flex flex-col gap-3">
              <div className="flex w-full gap-3">

                <img
                  src={
                    post.topComment.commentCreator.photo
                  }
                  alt={
                    post.topComment.commentCreator.name
                  }
                  className="h-9 w-9 rounded-full object-cover"
                />

                <div className="w-full">

                  {showEditComment ? (
                    <EditComment
                      comment={post.topComment}
                      postId={post._id}
                      setShowEditComment={
                        setShowEditComment
                      }
                      refetchComments={
                        refetchPosts
                      }
                    />
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2 rounded-2xl bg-slate-100 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900">
                            {
                              post.topComment
                                .commentCreator.name
                            }
                          </p>

                          <p className="mt-0.5 text-sm leading-5 text-slate-700">
                            {post.topComment.content}
                          </p>

                          {post.topComment.image && (
                            <img
                              src={
                                post.topComment.image
                              }
                              alt=""
                              className="mt-2 max-w-50 rounded-xl"
                            />
                          )}
                        </div>

                        {userData?._id ===
                          post.topComment
                            .commentCreator._id && (
                          <Dropdown>
                            <Button
                              aria-label="Comment menu"
                              variant="ghost"
                              className="h-7 min-w-7 shrink-0 px-1"
                            >
                              <MoreHorizontal size={20} />
                            </Button>

                            <Dropdown.Popover placement="bottom end">
                              <Dropdown.Menu
                                onAction={(key) =>
                                  console.log(`Selected: ${key}`)
                                }
                              >
                                <Dropdown.Item
                                  id="edit-comment"
                                  textValue="Edit comment"
                                  onAction={() =>
                                    setShowEditComment(true)
                                  }
                                >
                                  <Label className="flex items-center gap-1.5">
                                    <LucideEdit size={18} />
                                    Edit
                                  </Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                  id="delete-comment"
                                  textValue="Delete comment"
                                  variant="danger"
                                  onAction={
                                    deleteCommentDialog.open
                                  }
                                >
                                  <Label className="flex items-center gap-1.5 text-red-600">
                                    <Trash size={18} className="text-red-600" />
                                    Delete
                                  </Label>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown.Popover>
                          </Dropdown>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-4 px-3 text-xs text-slate-500">
                        <button
                          type="button"
                          className="font-semibold hover:text-slate-800"
                        >
                          Like
                        </button>

                        <button
                          type="button"
                          className="font-semibold hover:text-slate-800"
                        >
                          Reply
                        </button>

                        <span className="font-semibold hover:text-slate-800">{new Date(
                    post.topComment.createdAt
                  ).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Link
                to={`/PostDetails/${post._id}`}
                className="pl-2 pb-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                View more comments
              </Link>
            </div>
          )}

          {/* Delete Comment Alert (no <AlertDialog> root, controlled Backdrop only) */}
          {!isDeletingComment && (
            <AlertDialog.Backdrop
              isOpen={deleteCommentDialog.isOpen}
              onOpenChange={deleteCommentDialog.setOpen}
            >
              <AlertDialog.Container>
                <AlertDialog.Dialog className="sm:max-w-md">
                  <AlertDialog.CloseTrigger />

                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger" />

                    <AlertDialog.Heading>
                      Delete comment permanently?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>

                  <AlertDialog.Body>
                    <p>
                      This will permanently delete{" "}
                      <strong>Your Comment</strong>. This
                      action cannot be undone.
                    </p>
                  </AlertDialog.Body>

                  <AlertDialog.Footer>
                    <Button
                      slot="close"
                      variant="tertiary"
                    >
                      Cancel
                    </Button>

                    <Button
                      onPress={deleteUserComment}
                      variant="danger"
                    >
                      Delete Comment
                    </Button>
                  </AlertDialog.Footer>
                </AlertDialog.Dialog>
              </AlertDialog.Container>
            </AlertDialog.Backdrop>
          )}

          {/* Add Comment */}
          {showCommentInput && (
            <PostComment
              postId={post._id}
              refetchPosts={refetchPosts}
            />
          )}
        </div>
      </article>
    </>
  );
}