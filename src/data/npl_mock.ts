export interface NplUser {
  id: string;
  phone: string;
  name: string;
  email: string;
  outstanding_balance: number;
  due_date: string;
  last_payment: string;
  total_paid: number;
  monthly_installment: number;
  branch: string;
}

export interface NplBranch {
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface NplDocument {
  id: string;
  name: string;
  status: 'uploaded' | 'missing' | 'pending';
  required: boolean;
}

export const mockUser: NplUser = {
  id: "1234567890123",
  phone: "0812345678",
  name: "Somrak Thawan",
  email: "somrak@example.com",
  outstanding_balance: 9000,
  due_date: "2025-11-15",
  last_payment: "2025-09-15",
  total_paid: 52000,
  monthly_installment: 3500,
  branch: "Bangkok Main Office",
};

export const mockBranches: NplBranch[] = [
  {
    name: "Bangkok Main Office",
    address: "123 Sukhumvit Road, Bangkok 10110",
    phone: "02-686-1888",
    hours: "Mon–Fri 09:00–17:00",
  },
  {
    name: "Chiang Mai Branch",
    address: "416 Mahidol Rd, Chiang Mai 50000",
    phone: "053-666-979",
    hours: "Mon–Fri 09:00–17:00",
  },
  {
    name: "Phuket Branch",
    address: "79/6 Thepkasattri Rd, Phuket 83000",
    phone: "076-345-679",
    hours: "Mon–Fri 09:00–17:00",
  },
  {
    name: "Pattaya Branch",
    address: "456 Beach Road, Pattaya 20150",
    phone: "038-456-7890",
    hours: "Mon–Fri 09:00–17:00",
  },
];

export const mockDocuments: NplDocument[] = [
  {
    id: "1",
    name: "Thai National ID Card",
    status: "uploaded",
    required: true,
  },
  {
    id: "2",
    name: "Signed Application Form",
    status: "uploaded",
    required: true,
  },
  {
    id: "3",
    name: "Salary Slip or Income Proof",
    status: "missing",
    required: true,
  },
  {
    id: "4",
    name: "Bank Statement (Last 3 months)",
    status: "pending",
    required: true,
  },
  {
    id: "5",
    name: "Other Supporting Documents",
    status: "missing",
    required: false,
  },
];

export const mockPaymentHistory = [
  {
    id: "1",
    date: "2025-09-15",
    amount: 3500,
    status: "completed",
    reference: "PAY001234",
  },
  {
    id: "2",
    date: "2025-08-15",
    amount: 3500,
    status: "completed",
    reference: "PAY001233",
  },
  {
    id: "3",
    date: "2025-07-15",
    amount: 3500,
    status: "completed",
    reference: "PAY001232",
  },
  {
    id: "4",
    date: "2025-06-15",
    amount: 3500,
    status: "completed",
    reference: "PAY001231",
  },
];
