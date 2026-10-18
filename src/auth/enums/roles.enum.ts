// User categories are stored as numbers. Keep the unused values so new
// categories can be enabled later without changing the API contract.
export enum Role {
  DISABILITY = 0,
  ELDERLY = 1,
  DOCTOR = 2,
  PHARMACY = 3,
  PHYSIOTHERAPIST = 4,
  NURSE = 5,
  OTHER = 6,
  FUTURE_7 = 7,
  FUTURE_8 = 8,
  FUTURE_9 = 9,
  FUTURE_10 = 10,
}

// These fields are retained for compatibility with the current mobile/web UI.
export enum PatientType { ELDERLY = 0, DISABILITY = 1 }
export enum ProviderType { DOCTOR = 2, PHARMACY = 3, PHYSIOTHERAPIST = 4, NURSE = 5 }
