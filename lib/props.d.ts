import { LucideIcon } from "lucide-react"

type SideBarLink = {
  title: string,
  url: string,
  icon: LucideIcon
}

type SidebarMenuProps = {
  links: SideBarLink[]
  pathname: string
}

type PageTitleProps = {
  title: string
  icon?: LucideIcon
}

type SideBarHeaderProps = {
  state: "collapsed" | "expanded"
  isMobile: boolean
}

type SidebarFooterProps = {
  user: IUser,
  state: "expanded" | "collapsed"
  isMobile: boolean
}

type AuthFormProps = {
  type: "sign-in" | "sign-up"
}

type PasswordStrengthProps = {
  password: string
}

type PasswordFieldProps = {
  field: ControllerRenderProps<{
    email: string;
    password: string;
  }, "password">
}

type ListActionsProps = {
  id: string
}

type UICardProps = {
  label: string
  amount: number
  icon: LucideIcon
  isActive?: boolean
  variant?: "default" | "pending" | "approved" | "rejected" | "closed"
  className?: string
}

type ComboBoxProps = {
  items: {
    value: string,
    label: string
  }[]
  disabled?: boolean
}

type CategoryBadgeProps = {
  label: string
  count: number
}

type ContentDialogProps = {
  isRental: boolean
  rental?: IRental
  instrument?: IInstrument
  isGhost?: boolean
  isAdmin?: boolean
  className?: string
}

type AdminCardProps = {
  label: string
  count: number
}

type InstrumentDialogProps = {
  type?: "create" | "edit"
  instrument?: IInstrument
}

type InstrumentFormProps = {
  onSuccess: () => void
  instrument?: IInstrument
  type?: "create" | "edit"
}

type ProfileCardProps = {
  user: IUser
}

type UserFormProps = {
  user?: IUser
  type?: "create" | "edit"
  isAdmin?: boolean
}

