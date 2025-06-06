type IJWT = {
  userId: string,
  role: string,
  iat: number,
  exp: number
}

type IUser = {
  id: string,
  firstname: string,
  lastname: string,
  name?: string
  role: string,
  email: string,
  status: string,
  instruments: { id: string }[],
}

type IInstrument = {
  id: string
  qrCodeId: string | null
  qrCodeImg: string | null
  category: string | null
  brand: string | null
  state: string
  warehouse: string | null
  userId: string | undefined | null
  isAffected: boolean
  rentalId: string | undefined | null
  situation: string
  inUse: boolean
  user?: string | undefined | null
}

type IInstrumentForm = {
  id: string
  qrCodeId: string | null
  categoryId: string | null
  brandId: string | null
  state: string
  warehouseId: string | null
  userId: string | undefined | null
  isAffected: boolean
  rentalId: string | undefined | null
  situation: string
  inUse: boolean
}

type IBorrowedInstruments = {
  id: string
  categoryId: string
  brandId: string
  state: string
  warehouseId: string
  userId: string
  inUse: boolean
  quantity: number
}

type ILoan = {
  id: string
  owner: string
  reason: string
  from: Date
  to: Date
  instruments: IBorrowedInstruments[]
}

type IQRCode = {
  id: string
  instrumentId: string
  qrCode: string
}

type IBrand = {
  id: string
  name: string
}

type ICategory = {
  id: string
  name: string
}

type IRental = {
  id: string
  qrCodeId: string
  user: string
  startDate: Date
  endDate: Date
  status: "pending" | "approved" | "rejected" | "closed"
  rentalReason: string
}

type IRentalReason = {
  id: string
  name: string
}

type IRequest = {
  id: string
  instrument: string
  user: string
  status: "pending" | "approved" | "rejected"
  requestReason: string
}

type IWarehouse = {
  id: string
  name: string
}

type IRequestReason = {
  id: string
  name: string
}

