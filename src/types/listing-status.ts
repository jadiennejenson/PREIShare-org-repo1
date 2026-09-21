// src/types/listing-status.ts
// Closed set of lifecycle states from the field inventory.
// Only these exact strings are allowed—no free text.
// src/types/listing-status.ts
// Keep the string union as the single source of allowed status spellings.
export type ListingStatus =
  | 'draft'
  | 'active'
  | 'under_contract'
  | 'closed'
  | 'archived';