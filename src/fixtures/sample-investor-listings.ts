import type { InvestorListing } from "../types";

/** Active multifamily listing with full nested shapes. */
export const sampleActiveListing: InvestorListing = {
  id: "listing-001",
  createdAt: "2026-09-01T12:00:00Z",
  updatedAt: "2026-09-15T12:00:00Z",
  title: "Riverfront Multifamily — 24 Units",
  status: "active",
  propertyType: "multi_family",
  address: {
    street: "1200 River Rd, Suite 100",
    city: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US"
  },
  financials: {
    askingPrice: 4250000,
    noi: 312000,
    capRate: 0.073,
    occupancyRate: 0.94
  },
  contacts: [
    {
      id: "contact-001",
      fullName: "Jordan Lee",
      email: "jordan.lee@example.com",
      phone: "+1-512-555-0142",
      role: "listing_agent"
    }
  ],
  ownership: {
    ownerName: "PREI Riverfront Holdings LLC",
    ownershipPercent: 100
  }
};

/** Draft listing — still being prepared; may use draft-only fields if your discriminated union requires them. */
export const sampleDraftListing: InvestorListing = {
  id: "listing-002",
  createdAt: "2026-09-10T12:00:00Z",
  updatedAt: "2026-09-10T12:00:00Z",
  title: "Draft — Oak Street Retail Pad",
  status: "draft",
  propertyType: "commercial",
  address: {
    street: "800 Oak St",
    city: "Dallas",
    region: "TX",
    postalCode: "75201",
    country: "US"
  },
  financials: {
    askingPrice: 980000,
    noi: 0,
    capRate: 0,
    occupancyRate: 0
  },
  contacts: [],
  ownership: {
    ownerName: "PREI Draft Vehicles LLC",
    ownershipPercent: 100
  }
};

/** Under-contract listing — exercises the under-contract status branch. */
export const sampleUnderContractListing: InvestorListing = {
  id: "listing-003",
  createdAt: "2026-08-20T12:00:00Z",
  updatedAt: "2026-09-12T12:00:00Z",
  title: "Cedar Industrial — Under Contract",
  status: "under_contract",
  propertyType: "commercial",
  address: {
    street: "4500 Cedar Blvd",
    city: "Houston",
    region: "TX",
    postalCode: "77002",
    country: "US"
  },
  financials: {
    askingPrice: 6100000,
    noi: 455000,
    capRate: 0.075,
    occupancyRate: 0.88
  },
  contacts: [
    {
      id: "contact-002",
      fullName: "Sam Rivera",
      email: "sam.rivera@example.com",
      role: "buyer_rep"
    }
  ],
  ownership: {
    ownerName: "PREI Cedar JV",
    ownershipPercent: 60
  }
};

/** Closed listing — historical record still typed as InvestorListing. */
export const sampleClosedListing: InvestorListing = {
  id: "listing-004",
  createdAt: "2026-07-01T12:00:00Z",
  updatedAt: "2026-08-01T12:00:00Z",
  title: "Summit Office — Closed",
  status: "closed",
  closedAt: "2026-08-01T12:00:00Z",
  propertyType: "commercial",
  address: {
    street: "1 Summit Plaza",
    city: "San Antonio",
    region: "TX",
    postalCode: "78205",
    country: "US"
  },
  financials: {
    askingPrice: 2750000,
    noi: 198000,
    capRate: 0.072,
    occupancyRate: 0.97
  },
  contacts: [
    {
      id: "contact-003",
      fullName: "Alex Chen",
      email: "alex.chen@example.com",
      role: "seller_rep"
    }
  ],
  ownership: {
    ownerName: "PREI Summit LLC",
    ownershipPercent: 100
  }
};

/** All valid samples — useful for later UI mocks and typecheck scripts. */
export const sampleInvestorListings: InvestorListing[] = [
  sampleActiveListing,
  sampleDraftListing,
  sampleUnderContractListing,
  sampleClosedListing
];