export const notifications = [
  {
    status: "read",
    sender: "Eddy H.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "read",
    sender: "Mitchel U.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "read",
    sender: "Arnold D.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "read",
    sender: "Franck K.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "unread",
    sender: "Evelyn I.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "unread",
    sender: "Eddy H.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  },
  {
    status: "unread",
    sender: "Evelyn I.",
    message: "You have 4 instruments to return",
    createdAt: new Date("3/3/2025")
  }
]

export const instruments = [
  {
    id: 'inst-001',
    categoryId: 'cat-01',
    brandId: 'brand-01',
    state: 'new',
    situation: 'available',
    warehouse: "warehouse-1",
    rentalId: '',
    userId: 'user-0098',
    isAffected: false,
    inUse: false,
    qrCodeId: 'qr-001'
  },
  {
    id: 'inst-002',
    categoryId: 'cat-02',
    brandId: 'brand-02',
    state: 'dated',
    situation: 'rented',
    warehouse: "warehouse-1",
    rentalId: 'rent-001',
    userId: 'user-001',
    isAffected: true,
    inUse: true,
    qrCodeId: 'qr-002'
  },
  {
    id: 'inst-003',
    categoryId: 'cat-01',
    brandId: 'brand-03',
    warehouse: "warehouse-1",
    state: 'damaged',
    situation: 'available',
    rentalId: '',
    userId: '',
    isAffected: false,
    inUse: false,
    qrCodeId: 'qr-003'
  },
  {
    id: 'inst-004',
    categoryId: 'cat-03',
    brandId: 'brand-01',
    state: 'new',
    warehouse: "warehouse-2",
    situation: 'rented',
    rentalId: 'rent-002',
    userId: 'user-002',
    isAffected: true,
    inUse: true,
    qrCodeId: 'qr-004'
  },
  {
    id: 'inst-005',
    categoryId: 'cat-02',
    brandId: 'brand-02',
    warehouse: "warehouse-3",
    state: 'dated',
    situation: 'available',
    rentalId: '',
    userId: '',
    isAffected: false,
    inUse: false,
    qrCodeId: 'qr-005'
  },
  {
    id: 'inst-006',
    categoryId: 'cat-03',
    warehouse: "warehouse-1",
    brandId: 'brand-02',
    state: 'new',
    situation: 'rented',
    rentalId: 'rent-003',
    userId: 'user-003',
    isAffected: true,
    inUse: true,
    qrCodeId: 'qr-006'
  },
  {
    id: 'inst-007',
    categoryId: 'cat-04',
    brandId: 'brand-01',
    warehouse: "warehouse-1",
    state: 'damaged',
    situation: 'available',
    rentalId: '',
    userId: '',
    isAffected: false,
    inUse: false,
    qrCodeId: 'qr-007'
  },
  {
    id: 'inst-008',
    categoryId: 'cat-02',
    warehouse: "warehouse-3",
    brandId: 'brand-04',
    state: 'new',
    situation: 'rented',
    rentalId: 'rent-004',
    userId: 'user-004',
    isAffected: true,
    inUse: true,
    qrCodeId: 'qr-008'
  },
  {
    id: 'inst-009',
    categoryId: 'cat-05',
    brandId: 'brand-02',
    state: 'dated',
    warehouse: "warehouse-3",
    situation: 'available',
    rentalId: '',
    userId: '',
    isAffected: false,
    inUse: false,
    qrCodeId: 'qr-009'
  },
  {
    id: 'inst-010',
    categoryId: 'cat-01',
    brandId: 'brand-03',
    state: 'new',
    warehouse: "warehouse-1",
    situation: 'rented',
    rentalId: 'rent-005',
    userId: 'user-005',
    isAffected: true,
    inUse: true,
    qrCodeId: 'qr-010'
  }
];

export const chartData = [
  { category: "guitar", count: 275, fill: "var(--color-guitar)" },
  { category: "bass", count: 200, fill: "var(--color-bass)" },
  { category: "drums", count: 287, fill: "var(--color-drums)" },
  { category: "piano", count: 173, fill: "var(--color-piano)" },
  { category: "others", count: 190, fill: "var(--color-others)" },
]

export const categories = [
  { category: "guitar", count: 275, },
  { category: "bass", count: 200, },
  { category: "drums", count: 287, },
  { category: "piano", count: 173, },
  { category: "others", count: 190, },
]

export const rentals: IRental[] = [
  {
    id: 'r001',
    qrCodeId: 'qr-002',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "pending",
    rentalReason: "culte"
  },
  {
    id: 'r002',
    qrCodeId: 'qr-005',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "closed",
    rentalReason: "moorn"
  },
  {
    id: 'r003',
    qrCodeId: 'qr-006',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "rejected",
    rentalReason: "feast"
  },
  {
    id: 'r004',
    qrCodeId: 'qr-010',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "approved",
    rentalReason: "culte"
  },
  {
    id: 'r005',
    qrCodeId: 'qr-002',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "closed",
    rentalReason: "culte"
  },
  {
    id: 'r006',
    qrCodeId: 'qr-006',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "pending",
    rentalReason: "culte"
  },
  {
    id: 'r007',
    qrCodeId: 'qr-007',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "pending",
    rentalReason: "culte"
  },
  {
    id: 'r008',
    qrCodeId: 'qr-002',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "closed",
    rentalReason: "culte"
  },
  {
    id: 'r009',
    qrCodeId: 'qr-002',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "approved",
    rentalReason: "culte"
  },
  {
    id: 'r010',
    qrCodeId: 'qr-002',
    user: 'Christian Ull',
    startDate: new Date("5/23/2025"),
    endDate: new Date("5/26/2025"),
    status: "pending",
    rentalReason: "culte"
  },
]

export const rentalFormData = {
  instruments: [
    { value: "int01", label: "Intrument 1" },
    { value: "int02", label: "Intrument 2" },
    { value: "int03", label: "Intrument 3" },
    { value: "int04", label: "Intrument 4" },
    { value: "int05", label: "Intrument 5" }
  ],
  users: [
    { value: "user01", label: "User 1" },
    { value: "user02", label: "User 2" },
    { value: "user03", label: "User 3" },
    { value: "user04", label: "User 4" },
    { value: "user05", label: "User 5" }
  ],
  reasons: [
    { value: "rea01", label: "Reason 1" },
    { value: "rea02", label: "Reason 2" },
    { value: "rea03", label: "Reason 3" },
    { value: "rea04", label: "Reason 4" },
    { value: "rea05", label: "Reason 5" }
  ],
}

export const instrumentsCategories = [
  { label: "guitar", value: "cat-1", },
  { label: "bass", value: "cat-2", },
  { label: "drums", value: "cat-3", },
  { label: "piano", value: "cat-4", },
  { label: "others", value: "cat-5", },
]

export const requestInstrument:IRequest[] = [
  {
    id: "req-1",
    instrument: "bass",
    user: "Eddy",
    status: "rejected",
    requestReason: "r-001"
  },
  {
    id: "req-1",
    instrument: "bass",
    user: "Eddy",
    status: "rejected",
    requestReason: "r-001"
  },
  {
    id: "req-1",
    instrument: "bass",
    user: "Eddy",
    status: "rejected",
    requestReason: "r-001"
  },
  {
    id: "req-1",
    instrument: "bass",
    user: "Eddy",
    status: "rejected",
    requestReason: "r-001"
  },
  {
    id: "req-1",
    instrument: "bass",
    user: "Eddy",
    status: "rejected",
    requestReason: "r-001"
  }
]