interface IRequestReason {
  id: string
  name: string
}

interface SignInParams {
  password: string;
  email: string;
}

interface SetPasswordParams {
  userId: string
  password: string;
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

interface createHashTokenParams {
  token: string
  userId: string
}

interface createInstrumentParams {
  categoryId: string
  brandId: string
  warehouseId: string
  state: string
  quantity: string
}

interface editInstrumentParams {
  id: string
  qrCodeId: string
  userId: string
  categoryId: string
  brandId: string
  warehouseId: string
  state: string
  situation: string
}

type groupInstrumentsByCategoryIdParams = {
  instruments: {
    id: string,
    categoryId: string
    category: string | null
  }[]
}

type createRentalParams = {
  userId: string
  instrumentIds: string[]
  rentalReasonId: string
  startDate: Date
  endDate: Date
}
