interface IJWT {
  userId: string,
  role: string,
  iat: number,
  exp: number
}

interface IUser {
  id: string,
  firstname: string,
  lastname: string,
  name?: string
  role: string,
  email: string,
  status: string,
  instruments: { id: string }[],
}

interface IInstrument {
  id: string
  qrCodeId: string
  categoryId: string
  brandId: string
  state: "new" | "dated" | "damaged"
  local: "local-1" | "local-2" | "local-3"
  userId: string | undefined
  isAffected: boolean
  rentalId: string | undefined
  situation: "available" | "rented"
  inUse: boolean
}

interface IBorrowedInstruments {
  id: string
  categoryId: string
  brandId: string
  state: string
  local: "local-1" | "local-2" | "local-3"
  userId: string
  inUse: boolean
  quantity: number
}

interface ILoan {
  id: string
  owner: string
  reason: string
  from: Date
  to: Date
  instruments: IBorrowedInstruments[]
}

interface IQRCode {
  id: string
  instrumentId: string
  qrCode: string
}

interface IBrand {
  id: string
  name: string
}

interface ICategory {
  id: string
  name: string
}

interface IRental {
  id: string
  qrCodeId: string
  user: string
  startDate: Date
  endDate: Date
  status: "pending" | "approved" | "rejected" | "closed"
  rentalReason: string
}

interface IRentalReason {
  id: string
  name: string
}

interface IRequest {
  id: string
  instrument: string
  user: string
  status: "pending" | "approved" | "rejected"
  requestReason: string
}

interface IRequestReason {
  id: string
  name: string
}

interface SignInParams {
  password: string;
  email: string;
}

interface SignUpParams {
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  confirmedPassword: string;
}

interface ForgotPasswordParams {
  email: string
}

interface HandleErrorParams {
  error: unknown
  message: string
}

interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface sendAccountInfosEmailParams {
  email: string;
  firstname: string;
  password: string;
}

