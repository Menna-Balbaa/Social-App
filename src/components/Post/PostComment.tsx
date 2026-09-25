import { Image, Smile, Send, XCircleIcon } from "lucide-react";
import { useContext, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { createComment } from "../../services/comments.services";
import { Spinner } from "@heroui/react";
import { userContext } from "../context/UserContext";
export default function PostComment({ postId, refetchPosts, getComments, className = "" }: { postId: string, refetchPosts?: () => void, getComments?: (id: string) => void, className?: string }) {

    const [userComment, setUserComment] = useState("")
    const [userImg, setUserImg] = useState<File | null>(null)
    const [emoji, setEmoji] = useState(false)
    const imgInput = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const  { userData } = useContext(userContext)!



    function chooseFile() {
        imgInput.current?.click()
    }

    function getImgURL() {
        const file = imgInput.current?.files![0]
        setUserImg(file!)
    }

    async function addComment() {
        const formData = new FormData()
        if (userComment) {
            formData.append("content", userComment)
        }
        if (userImg) {
            formData.append("image", userImg)
        }

        setIsLoading(true)
        try {
            const { data } = await createComment(postId!, formData)
            console.log(data);
            refetchPosts?.()
            getComments?.(postId)
            setUserComment("")
            setUserImg(null)
            setEmoji(false)

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }

    function addEmoji(emojiData: EmojiClickData) {
        setUserComment((comment) => comment + emojiData.emoji)
    }

    return (
        <div className={`flex items-start gap-2.5 my-4.5 ${className}`}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                <img src={userData?.photo} alt="userProfile" className="rounded-full" />
                
            </div>

            <div className="relative min-w-0 flex-1 rounded-3xl bg-slate-100 p-4 shadow-lg">
                <textarea
                    value={userComment}
                    onChange={(e) => {
                        setUserComment(e.target.value)
                    }}
                    placeholder={`Comment as ${userData?.name}...`}
                    rows={2}
                    className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
            
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                    <div className=" flex items-center gap-1">
                        <button onClick={() => {
                            chooseFile()
                        }} className="rounded-full p-2 cursor-pointer text-slate-500 hover:text-green-600 duration-300 hover:bg-slate-200">
                            <input onChange={getImgURL} ref={imgInput} type="file" hidden />
                            <Image size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setEmoji((isOpen) => !isOpen)}
                            className="rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-yellow-500 duration-300 cursor-pointer"
                            aria-label="Choose an emoji"
                        >
                            <Smile size={16} />
                        </button>

                    </div>

                    <button onClick={addComment} disabled={!userComment && !userImg} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
                        {isLoading ? <Spinner className="text-white" /> : <Send size={16} />}

                    </button>

                </div>
                {emoji && (
                    <div className="absolute top-full left-0 z-50 mt-2">
                        <EmojiPicker onEmojiClick={addEmoji} />
                    </div>
                )}
                {userImg && <div className="mt-3 p-3 w-37 relative">
                    <XCircleIcon onClick={() => setUserImg(null)} className="absolute top-2 -inset-e-4 text-blue-600 cursor-pointer" />
                    <img src={URL.createObjectURL(userImg)} alt="" className="w-full" />
                </div>}
            </div>
        </div>
    );
}
