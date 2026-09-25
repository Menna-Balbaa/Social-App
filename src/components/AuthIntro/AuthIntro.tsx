type AuthIntroStat = {
  value: string
  label: string
}

const academyStats: AuthIntroStat[] = [
  { value: "2012", label: "Founded" },
  { value: "40K+", label: "Graduates" },
  { value: "50+", label: "Partner Companies" },
  { value: "5", label: "Branches" },
  { value: "20", label: "Diplomas Available" },
]

type AuthIntroProps = {
  className?: string
}

export default function AuthIntro({ className = "" }: AuthIntroProps) {
  return (
    <section className={`flex w-full max-w-2xl flex-col gap-6 ${className}`}>
      
      <div className="flex flex-col ms-1.5 gap-2">
        <h1 className="text-main text-4xl font-extrabold tracking-tight sm:text-5xl">
          Route Posts
        </h1>

        <p className="text-lg leading-7 text-slate-800 sm:text-xl">
          Connect with friends and the world around you on Route Posts.
        </p>
      </div>

      <div className="w-full rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-main text-xs font-bold tracking-[0.12em] uppercase">
          About Route Academy
        </p>

        <h2 className="mt-2 text-lg font-bold text-slate-900">
          Egypt&apos;s Leading IT Training Center Since 2012
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Route Academy is the premier IT training center in Egypt, established in
          2012. We specialize in delivering high-quality training courses in
          programming, web development, and application development. We&apos;ve
          identified the unique challenges people may face when learning new
          technology and made efforts to provide strategies to overcome them.
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {academyStats.map((stat) => (
            <li
              key={stat.label}
              className="border-main/15 bg-main/6 rounded-lg border px-3 py-2"
            >
              <p className="text-main text-sm font-bold">{stat.value}</p>

              <p className="mt-0.5 text-[9px] font-semibold tracking-wide text-slate-600 uppercase">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}