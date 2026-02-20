import {SignOut} from "@/app/ui/account/signout-button.tsx";
import Link from "next/link";

export default function DashboardLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className="h-screen">
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav className="float-left flex min-w-52 text-slate-400 h-full bg-cyan-800">
                <div>
                    <Link className={`block underline text-amber-100 hover:text-amber-300`} href={`/account`}>Pocetna Strana</Link>
                </div>
                <SignOut></SignOut>
            </nav>

            <div className={`overflow-y-auto`}>
                {children}
            </div>
        </section>
    )
}