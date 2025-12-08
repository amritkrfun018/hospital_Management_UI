export interface DoctorDisplayDTO extends DoctorInfoBase {
  tokenAvailable: boolean;
  bookingStatus: BookingStatus;
  bookedOn: string | null;     // LocalDateTime → string
  tokenNo: string | null;
}

export interface DoctorInfoBase {
  doctorId: string;
  fullName: string;
  email: string;
  sex: string;
  opdRoomNo: string;
  hospital: string;
  branch: string;
  availableOnline: boolean;
  medicalSpecialty: string;
  workingDays: DayOfWeek[];
  experience: string;
}

export type BookingStatus = "BOOKED" | "PENDING" | "CANCELLED" | "NONE";
// Adjust this to match your enum values exactly from backend

export type DayOfWeek = 
  | "MONDAY" 
  | "TUESDAY" 
  | "WEDNESDAY" 
  | "THURSDAY" 
  | "FRIDAY" 
  | "SATURDAY" 
  | "SUNDAY";

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page index
  first: boolean;
  last: boolean;
  empty: boolean;
}
