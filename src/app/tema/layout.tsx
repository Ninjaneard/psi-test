
export default function DashboardLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className="h-screen">
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav className="float-left flex min-w-52 text-slate-400 h-full bg-cyan-800">

            </nav>

            <div className={`overflow-y-auto`}>
                {children}
            </div>
        </section>
    )
}