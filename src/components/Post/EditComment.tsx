import { Edit, Image, Smile, XCircleIcon } from "lucide-react";
import { useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { Spinner } from "@heroui/react";
import { updateComment } from "../../services/comments.services";
import type { PostCommentI } from "../../types/postComments";

export default function EditComment({setShowEditComment, comment, postId, refetchComments,}: {
  setShowEditComment: (value: boolean) => void; comment: PostCommentI; postId: string; refetchComments: () => void;}) {

  const [userEditCommentContent, setUserEditCommentContent] = useState(comment.content);
  const [userEditCommentImg, setUserEditCommentImg] = useState<File | null | string>(comment.image || null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const imgInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function chooseFile() {
    imgInput.current?.click();
  }

  function getImgURL() {
    const file = imgInput.current?.files?.[0];
    if (file) {
      setUserEditCommentImg(file);
      setIsImageRemoved(false);
    }
  }

  async function editComment() {
    const formData = new FormData();

    if (userEditCommentContent) {
      formData.append("content", userEditCommentContent);
    }
    if (userEditCommentImg && userEditCommentImg !== comment.image) {
      formData.append("image", userEditCommentImg);
    }
    if (isImageRemoved) {
      formData.append("image", "");
    }
    setIsLoading(true);

    try {
      const { data } = await updateComment(postId, comment._id, formData);

      console.log(data);
      refetchComments();
      setUserEditCommentContent("");
      setUserEditCommentImg(null);
      setIsImageRemoved(false);
      setEmoji(false);
      setShowEditComment(false);
    }
     catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  function addEmoji(emojiData: EmojiClickData) {
    setUserEditCommentContent(
      (comment) => comment + emojiData.emoji
    );
  }

  return (
    <>
      <div className="relative rounded-2xl bg-slate-100 p-3">
        <textarea
          value={userEditCommentContent}
          onChange={(e) =>
            setUserEditCommentContent(e.target.value)
          }
          rows={3}
          className="w-full resize-none rounded-xl bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />

        {userEditCommentImg && (
          <div className="relative mt-3 w-full">
            <button
              type="button"
              onClick={() => {
                setUserEditCommentImg(null);
                setIsImageRemoved(true);
              }}
              className="absolute -right-2 -top-2 z-10 cursor-pointer text-blue-600"
              aria-label="Remove photo or video"
            >
              <XCircleIcon />
            </button>
            <img
              src={typeof userEditCommentImg === "string" ? userEditCommentImg : URL.createObjectURL(userEditCommentImg)}
              alt=""
              className="h-50 w-full rounded-2xl bg-white object-contain"
            />
          </div>
        )}

        {emoji && (
          <div className="absolute bottom-full left-0 z-50 mb-2">
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <button type="button" onClick={chooseFile} className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white">
              <input ref={imgInput} onChange={getImgURL} type="file" accept="image/*,video/*" hidden />
              <Image size={18} className="text-green-500" />
              Photo/video
            </button>

            <button type="button" onClick={() => setEmoji((isOpen) => !isOpen)}
              className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-white"
            >
              <Smile size={18} className="text-amber-400" />
              Feeling/activity
            </button>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowEditComment(false)}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
            >
              Cancel
              <XCircleIcon size={17} />
            </button>

            <button type="button" onClick={editComment} disabled={ isLoading || !userEditCommentContent}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Spinner className="text-white" /> :  <> Edit <Edit size={16} /> </>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}