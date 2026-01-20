import { auth } from "../../../auth.ts"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null
    console.log(session.user);
    return (
        <div>
            <img src={session.user.image} alt="User Avatar" />
            <span>{session.user.name}</span>
            <span>{session.user.role}</span>
        </div>
    )
}