import { Globe, MoreHorizontal, ThumbsUp, MessageCircle, Share2, X, Trash, Bookmark, LucideEdit } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { deletePost, getSinglePost, saveUnsavePost, } from "../../services/post.services";
import { deleteComment, getPostComments } from "../../services/comments.services";
import { useContext, useEffect, useState } from "react";
import type { PostCardI } from "../../types/postCard";
import type { PostCommentI } from "../../types/postComments";
import PostDetailsSkeleton from "../../components/Post/PostDetailsSkeleton";
import PostComment from "../../components/Post/PostComment";
import EditPost from "../../components/Post/EditPost";
import EditComment from "../../components/Post/EditComment";
import { AlertDialog, Button, Dropdown, Label, Spinner, } from "@heroui/react";
import { userContext } from "../../components/context/UserContext";

export default function PostDetails() {

  const [postDetails, setPostDetails] = useState<PostCardI | null>(null);
  const [postComments, setPostComments] = useState<PostCommentI[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<PostCommentI | null>(null);
  const [showDeleteCommentWarning, setShowDeleteCommentWarning] = useState<boolean>(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);
  const [isDeletingPost, setIsDeletingPost] = useState<boolean>(false);
  const { userData } = useContext(userContext)!;
  const navigate = useNavigate();
  const { postId } = useParams();

  async function getPostDetails(id: string) {
    try {
      const { data } = await getSinglePost(id);

      const details: PostCardI = data.data.post;

      setPostDetails(details);

      console.log(details);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getComments(id: string) {
    try {
      const { data } = await getPostComments(id);

      const Comments: PostCommentI[] = data.data.comments;

      setPostComments(Comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUserPost() {
    setIsDeletingPost(true);

    try {
      const { data } = await deletePost(postDetails?._id!);

      console.log(data);

      setShowDeleteWarning(false);

      navigate("/feed");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingPost(false);
    }
  }

  async function deleteUserComment() {
    if (!selectedCommentId) return;

    setIsDeletingComment(true);

    try {
      const { data } = await deleteComment(
        postId!,
        selectedCommentId
      );

      console.log(data);

      setShowDeleteCommentWarning(false);
      setSelectedCommentId(null);

      getComments(postId!);
      getPostDetails(postId!);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingComment(false);
    }
  }

  async function savePost() {
    try {
      const { data } = await saveUnsavePost(postDetails?._id!);

      console.log(data);

      getPostDetails(postId!);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostDetails(postId!);
    getComments(postId!);
  }, []);

  return (
    <>
      {isDeletingPost && (
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

      {isLoading ? (
        <PostDetailsSkeleton />
      ) : (
        <>
          {postDetails && (
            <>
              <div className="flex items-start gap-2 bg-gray-100 p-2 sm:gap-3 sm:p-4">
                <Link
                  to="/feed"
                  className="mt-2 shrink-0 rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Link>

                <div className="flex min-h-[calc(100vh-5rem)] min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm lg:h-[calc(105vh-9rem)] lg:flex-row">
                  {postDetails.image && (
                    <div className="order-2 hidden aspect-4/3 max-h-[55vh] min-h-0 w-full shrink-0 items-center justify-center overflow-hidden bg-black lg:order-0 lg:flex lg:aspect-auto lg:h-full lg:max-h-none lg:w-auto lg:flex-1">
                      <img
                        src={postDetails.image}
                        alt="Post attachment"
                        className="block h-full w-full object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`order-1 flex w-full min-w-0 flex-1 flex-col border-t border-gray-200 lg:order-0 ${postDetails.image ? "lg:max-w-md lg:flex-none lg:border-l lg:border-t-0" : ""
                      }`}
                  >
                    <div className="flex items-start gap-2 border-b border-gray-200 p-3 sm:gap-3 sm:p-4">
                      <img
                        src={postDetails.user.photo}
                        alt={postDetails.user.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] font-semibold text-gray-900">
                          {postDetails.user.name}
                        </h3>

                        <p className="truncate text-sm text-gray-500">
                          @{postDetails.user.username}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                          <span>
                            {new Date(
                              postDetails.createdAt
                            ).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>

                          <span>·</span>

                          <Globe className="h-3 w-3" />

                          <span>
                            {postDetails.privacy}
                          </span>
                        </div>
                      </div>

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
                                postDetails.bookmarked
                                  ? "Unsave Post"
                                  : "Save Post"
                              }
                              onClick={savePost}
                            >
                        
                              <Label className="flex justify-between  gap-1">
                    <Bookmark size={18} className="mt-0.5"/>
                    {postDetails.bookmarked
                      ? "Unsave Post"
                      : "Save Post"}
                  </Label>
                            </Dropdown.Item>

                            {userData?._id === postDetails.user._id && (
                              <>
                                <Dropdown.Item
                                  onClick={() =>
                                    setShowEditPost(true)
                                  }
                                  id="edit-file"
                                  textValue="Edit file"
                                >
                                  
                                     <Label className="flex justify-between  gap-1.5">
                        <LucideEdit size={18} className="mt-0.5 ms-0.5"/>
                        Edit Post
                        </Label>
                                </Dropdown.Item>

                                <Dropdown.Item
                                  onClick={() =>
                                    setShowDeleteWarning(true)
                                  }
                                  id="delete-file"
                                  textValue="Delete file"
                                  variant="danger"
                                >
                       <Label className="flex justify-between  gap-1.5 text-red-600">
                        <Trash size={18} className="mt-0.5 ms-0.5 text-red-600"/>
                        Delete Post
                        </Label>
                                </Dropdown.Item>
                              </>
                            )}
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </div>

                    {!isDeletingPost && (
                      <AlertDialog
                        isOpen={showDeleteWarning}
                      >
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-md">
                              <AlertDialog.CloseTrigger />

                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                  Delete post permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>

                              <AlertDialog.Body>
                                <p>
                                  This will permanentlydelete{" "} <strong> Your Post </strong>{" "} and all of its data.
                                  This action cannot be undone.
                                </p>
                              </AlertDialog.Body>

                              <AlertDialog.Footer>
                                <Button
                                  onClick={() => setShowDeleteWarning(false)

                                  }
                                  slot="close"
                                  variant="tertiary"
                                >
                                  Cancel
                                </Button>

                                <Button
                                  onClick={deleteUserPost}
                                  slot="close"
                                  variant="danger"
                                >
                                  Delete Post
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    )}

                    {showEditPost ? (
                      <div className="flex-1 overflow-y-auto p-4">
                        <EditPost
                          setShowEditPost={setShowEditPost}
                          post={postDetails}
                          refetchPosts={() => {
                            getPostDetails(postId!);

                            getComments(postId!);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-4">
                        <p className="whitespace-pre-wrap wrap-break-word text-[15px] leading-7 text-gray-900">
                          {postDetails.body}
                        </p>

                        {postDetails.image && (
                          <div className="aspect-4/3 max-h-[55vh] w-full overflow-hidden bg-black lg:hidden">
                            <img
                              src={postDetails.image}
                              alt="Post attachment"
                              className="block h-full w-full object-contain"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                              <ThumbsUp className="h-3 w-3 fill-white" />
                            </span>

                            <span>
                              {postDetails.likesCount}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span>
                              {postDetails.commentsCount}{" "}
                              comments
                            </span>

                            <span>
                              {postDetails.sharesCount}{" "}
                              shares
                            </span>
                          </div>
                        </div>

                        <div className="flex border-t border-b border-gray-200 py-1">
                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                          >
                            <ThumbsUp className="h-5 w-5" />
                            Like
                          </button>

                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                          >
                            <MessageCircle className="h-5 w-5" />
                            Comment
                          </button>

                          <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                          >
                            <Share2 className="h-5 w-5" />
                            Share
                          </button>
                        </div>

                        {postComments && (
                          <div className="space-y-3">
                            {postComments.map((comment) => (
                              <div key={comment._id} className="flex gap-2.5">
                                <img
                                  src={comment.commentCreator.photo}
                                  alt={comment.commentCreator.name}
                                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                  {showEditComment && selectedComment?._id === comment._id ? (
                                    <EditComment
                                      comment={comment}
                                      postId={postId!}
                                      setShowEditComment={setShowEditComment}
                                      refetchComments={() => getComments(postId!)}
                                    />
                                  ) : (
                                    <>
                                      <div className="w-full rounded-2xl bg-gray-100 px-3 py-2">
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                              {comment.commentCreator.name}
                                            </p>
                                          </div>

                                          {userData?._id === comment.commentCreator._id && (
                                            <Dropdown>
                                              <Button aria-label="Comment menu" variant="ghost" className="h-7 min-w-7 shrink-0 px-1">
                                                <MoreHorizontal size={18} />
                                              </Button>

                                              <Dropdown.Popover placement="bottom end">
                                                <Dropdown.Menu
                                                  onAction={(key) => console.log(`Selected: ${key}`)}
                                                >
                                                  <Dropdown.Item
                                                    id="edit-comment"
                                                    textValue="Edit comment"
                                                    onClick={() => {
                                                      setSelectedComment(comment);
                                                      setShowEditComment(true);
                                                    }}
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
                                                    onClick={() => {
                                                      setSelectedCommentId(comment._id);
                                                      setShowDeleteCommentWarning(true);
                                                    }}
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

                                        <div className="mt-1 w-full">
                                          <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-800">
                                            {comment.content}
                                          </p>

                                          {comment.image && (
                                            <img
                                              className="mt-1.5 w-full max-w-full rounded-xl object-cover"
                                              src={comment.image}
                                              alt=""
                                            />
                                          )}
                                        </div>
                                      </div>

                                      <div className="mt-1 flex gap-3 px-3 text-xs font-medium text-gray-500">
                                        <button type="button" className="hover:underline">
                                          Like
                                        </button>
                                        <button type="button" className="hover:underline">
                                          Reply
                                        </button>
                                        <span>
                                          {new Date(comment.createdAt).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                          })}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

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

                    {!isDeletingComment && (
                      <AlertDialog
                        isOpen={
                          showDeleteCommentWarning
                        }
                      >
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-md">
                              <AlertDialog.CloseTrigger />

                              <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                  Delete comment
                                  permanently?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>

                              <AlertDialog.Body>
                                <p>
                                  This will permanently
                                  delete{" "}
                                  <strong>
                                    Your Comment
                                  </strong>
                                  . This action cannot be
                                  undone.
                                </p>
                              </AlertDialog.Body>

                              <AlertDialog.Footer>
                                <Button
                                  onClick={() => setShowDeleteCommentWarning(false)
                                  }
                                  variant="tertiary"
                                >
                                  Cancel
                                </Button>

                                <Button
                                  onClick={deleteUserComment}

                                  variant="danger"
                                >
                                  Delete Comment
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    )}

                    <PostComment
                      postId={postId!}
                      getComments={getComments}
                      className="ps-2.5 pe-6"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}