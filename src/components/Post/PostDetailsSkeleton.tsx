import { Skeleton } from "@heroui/react";

export default function PostDetailsSkeleton() {
    return (
        <div className="flex h-[calc(100vh-7rem)] items-start gap-3 p-4">
            <Skeleton className="mt-2 h-10 w-10 shrink-0 rounded-full" />

            <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl shadow-sm md:flex-row">
                <Skeleton className="min-h-80 flex-1 rounded-none md:min-h-0" />

                <div className="flex w-full max-w-md flex-col border-l ">
                    <div className="flex items-start gap-3 border-b p-4">
                        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <Skeleton className="h-3 w-32 rounded-lg" />
                            <Skeleton className="h-3 w-24 rounded-lg" />
                            <Skeleton className="h-2.5 w-40 rounded-lg" />
                        </div>
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>

                    <div className="flex-1 space-y-5 p-4">
                        <Skeleton className="h-4 w-4/5 rounded-lg" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-10 rounded-lg" />
                            <Skeleton className="h-3 w-36 rounded-lg" />
                        </div>
                        <div className="flex border-y  py-3">
                            <Skeleton className="mx-auto h-4 w-12 rounded-lg" />
                            <Skeleton className="mx-auto h-4 w-16 rounded-lg" />
                            <Skeleton className="mx-auto h-4 w-12 rounded-lg" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-gray-200 p-3">
                        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                        <Skeleton className="h-9 flex-1 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}