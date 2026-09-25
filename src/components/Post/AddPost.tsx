import { ChevronDown, Image, Smile, Send, XCircleIcon, Globe2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { createPost } from "../../services/post.services";
import { Spinner } from "@heroui/react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { userContext } from "../context/UserContext";
import AddPostSkeleton from "./AddPostSkeleton";

export default function AddPost({ refetchPosts }: { refetchPosts: () => void }) {

    const [userPostContent, setUserPostContent] = useState("")
    const [userPostImg, setUserPostImg] = useState<File | null>(null)
    const [emoji, setEmoji] = useState(false)
    const imgInput = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userData } = useContext(userContext)!


    function chooseFile() {
        imgInput.current?.click()
    }

    function getImgURL() {
        const file = imgInput.current?.files![0]
        setUserPostImg(file!)
    }

    async function addPost() {
        const formData = new FormData()
        if (userPostContent) {
            formData.append("body", userPostContent)
        }
        if (userPostImg) {
            formData.append("image", userPostImg)
        }

        setIsLoading(true)
        try {
            const { data } = await createPost(formData)
            console.log(data);
            refetchPosts?.()
            setUserPostContent("")
            setUserPostImg(null)
            setEmoji(false)

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    function addEmoji(emojiData: EmojiClickData) {
        setUserPostContent((comment) => comment + emojiData.emoji)
    }



    return (
        <>
            {!userData ? <AddPostSkeleton /> :
                <div className="rounded-3xl bg-white shadow-lg mb-5">
                    {/* Header */}
                    <div className="flex items-start gap-3 p-4 pb-3">
                        <div className="size-11">
                            <img src={userData?.photo} alt="user-profile" className="w-full rounded-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-slate-900">{userData?.name}</p>

                            {/* Privacy */}
                            <button className="mt-1 cursor-pointer flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">
                                <Globe2 size={12} />
                                Public
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Composer */}
                    <div className="px-4 pb-3">
                        <textarea
                            value={userPostContent}
                            onChange={(e) => setUserPostContent(e.target.value)}
                            placeholder={`What's on your mind, ${userData.name}?`}
                            rows={4}
                            className="w-full resize-none rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />
                        {userPostImg && <div className="mt-3 w-full relative">
                            <XCircleIcon onClick={() => setUserPostImg(null)} className="absolute -top-2 -inset-e-2 text-blue-600 cursor-pointer" />
                            <img src={URL.createObjectURL(userPostImg!)} alt="" className="w-full h-75 mb-3 object-contain object-center rounded-2xl bg-[#F1F5F9]" />
                        </div>}
                    </div>

                    <div className="mx-4 border-t border-slate-200" />

                    {/* Actions */}
                    <div className="relative flex items-center justify-between px-2 py-2">
                        <div className="flex items-center">
                            <button onClick={chooseFile} className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                                <input onChange={getImgURL} ref={imgInput} type="file" hidden />
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
                            <div className="absolute top-full left-0 z-50 mb-2">
                                <EmojiPicker onEmojiClick={addEmoji} />
                            </div>
                        )}

                        <button onClick={addPost} disabled={!userPostContent && !userPostImg} className="mr-2 cursor-pointer flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 text-white hover:bg-blue-600">
                            Post

                            {isLoading ? <Spinner className="text-white" /> : <Send size={16} />}

                        </button>


                    </div>
                </div>
            }

        </>
    );
}
