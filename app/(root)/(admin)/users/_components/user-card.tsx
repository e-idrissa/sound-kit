import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "../../../../../components/global/user-form"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/actions/user.actions"

export const UserCard = async () => {
  const jwt = await getCurrentUser() as IJWT
  if (!jwt) return redirect('/sign-in')

  const isAdmin = jwt.role === "ADMIN"

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>
          Fill all the fields with your new user informations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm type="create" isAdmin={isAdmin} />
      </CardContent>
    </Card>
  )
}