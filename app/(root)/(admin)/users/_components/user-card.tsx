import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserForm } from "./user-form"

export const UserCard = () => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>
          Fill all the fields with your new user informations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  )
}