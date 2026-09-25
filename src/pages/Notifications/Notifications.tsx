
export default function Notifications() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black  text-slate-900">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            <span className="text-base">✓</span>
            Mark all as read
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            className="rounded-full cursor-pointer bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-blue-600/20"
          >
            All
          </button>
          <button
            type="button"
            className="rounded-full cursor-pointer bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700"
          >
            Unread
          </button>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-slate-50 p-8 text-center shadow-inner">
          <p className="text-base font-medium text-slate-500">No notifications yet.</p>
        </div>
      </div>
    </main>
  );
}
