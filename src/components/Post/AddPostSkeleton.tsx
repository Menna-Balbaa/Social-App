import { Skeleton } from '@heroui/react'

export default function AddPostSkeleton() {
    return (
        <>
            <div className="rounded-3xl bg-white shadow-lg mb-5">
                {/* Header */}
                <div className="flex items-start gap-3 p-4 pb-3">
                    <Skeleton className="size-11 shrink-0 rounded-full" />

                    <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-3 w-28 rounded-lg" />
                        <Skeleton className="h-7 w-20 rounded-full" />
                    </div>
                </div>

                {/* Composer */}
                <div className="px-4 pb-3">
                    <Skeleton className="h-24 w-full rounded-2xl" />
                </div>

                {/* Divider */}
                <div className="mx-4 border-t border-slate-200" />

                {/* Actions */}
                <div className="flex items-center justify-between px-2 py-2">
                    <div className="flex items-center gap-1 mb-1.5">
                        <Skeleton className="h-10 w-28 mx-3 rounded-xl" />
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>

                    <Skeleton className="h-9 w-20 rounded-xl me-2" />
                </div>
            </div>

        </>
    )
}
