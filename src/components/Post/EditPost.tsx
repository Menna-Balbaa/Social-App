import { Edit, Image, Smile, XCircleIcon } from "lucide-react";
import type { PostCardI } from "../../types/postCard";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { updatePost } from "../../services/post.services";
import { Spinner } from "@heroui/react";

export default function EditPost({ setShowEditPost, post, refetchPosts }: { setShowEditPost: (value: boolean) => void, post: PostCardI, refetchPosts: () => void }) {

    const [userEditPostContent, setUserEditPostContent] = useState("")
    const [userEditPostImg, setUserEditPostImg] = useState<File | null | string>(null)
    const [emoji, setEmoji] = useState(false)
    const imgInput = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function chooseFile() {
        imgInput.current?.click()
    }

    function getImgURL() {
        const file = imgInput.current?.files![0]
        setUserEditPostImg(file!)
    }

    async function editPost() {
        const formData = new FormData()
        if (userEditPostContent) {
            formData.append("body", userEditPostContent)
        }
        if (userEditPostImg) {
            formData.append("image", userEditPostImg)
        }

        setIsLoading(true)
        try {
            const { data } = await updatePost(post._id, formData)
            console.log(data);
            refetchPosts?.()
            setUserEditPostContent("")
            setUserEditPostImg(null)
            setEmoji(false)
            setShowEditPost(false)

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    function addEmoji(emojiData: EmojiClickData) {
        setUserEditPostContent((comment) => comment + emojiData.emoji)
    }


    useEffect(() => {
        if (post.body) setUserEditPostContent(post.body)
        if (post.image) setUserEditPostImg(post.image)
    }, [post.body, post.image])


    return (
        <>
            <div className="px-4 pb-3">
                <textarea
                    value={userEditPostContent}
                    onChange={(e) => setUserEditPostContent(e.target.value)}
                    placeholder={`What's on your mind, ${post.user.name}?`}
                    rows={4}
                    className="w-full resize-none rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                {userEditPostImg && <div className="mt-3 w-full relative">
                    <img src={typeof userEditPostImg == "string" ? userEditPostImg : URL.createObjectURL(userEditPostImg!)} alt="" className="w-full h-75 mb-3 object-contain object-center rounded-2xl bg-[#F1F5F9]" />
                </div>}
            </div>

            <div className="mx-4 border-t border-slate-200" />

            {/* Actions */}
            <div className="relative flex items-center justify-between px-2 py-2">
                <div className="flex items-center">
                    <button type="button" onClick={chooseFile} className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                        <input ref={imgInput} onChange={getImgURL} type="file" hidden />
                        <Image size={18} className="text-green-500" />
                        Photo/video
                    </button>


                    <button type="button" onClick={() => setEmoji((isOpen) => !isOpen)}
                        className="flex items-center gap-2 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                        <Smile size={18} className="text-amber-400" />
                        Feeling/activity
                    </button>
                </div>

                {emoji && (
                    <div className="absolute bottom-full left-0 z-50 mt-2">
                        <EmojiPicker onEmojiClick={addEmoji} />
                    </div>
                )}

                <div className="flex gap-1">
                    <button onClick={() => setShowEditPost(false)} className="mr-2 cursor-pointer flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold enabled:hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 text-white hover:bg-red-600">
                        Cancel
                        <XCircleIcon size={18} />

                    </button>
                    <button onClick={editPost} className="mr-2 cursor-pointer flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 text-white hover:bg-blue-600">
                        {isLoading ? <Spinner className="text-white" /> : <>
                            Edit
                            <Edit size={16} />

                        </>}
                    </button>
                </div>


            </div>
        </>
    )
}
