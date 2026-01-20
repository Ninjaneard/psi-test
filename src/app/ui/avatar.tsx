import { auth } from "../../../auth.ts"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null
    console.log(session.user);
    return (
        <div>
            {
                session.user.image ? <img src={session.user.image} alt="User Avatar" /> :
                <div className="avatar">
                    <div className="avatar__initials">{session.user.name?.charAt(0)}</div>
                </div>
            }

            <span>{session.user.name}</span>
            <span>{session.user.role}</span>
        </div>
    )
}