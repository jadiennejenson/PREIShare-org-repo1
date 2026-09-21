// src/fixtures/sample-investor-listings.ts
// Scaffold: your agent should produce a file with this structure.
// Field names and union members MUST match your types from earlier steps.

import type { InvestorListing } from "../types";

/** Active multifamily listing with full nested shapes. */
export const sampleActiveListing: InvestorListing = {
  id: "listing-001",
  title: "Riverfront Multifamily — 24 Units",
  status: "active",
  propertyType: "multifamily",
  address: {
    line1: "1200 River Rd",
    line2: "Suite 100",
    city: "Austin",
    state: "TX",
    postalCode: "78701",
    country: "US"
  },
  financials: {
    askingPrice: 4250000,
    noi: 312000,
    capRate: 0.073,
    currency: "USD"
  },
  contacts: [
    {
      id: "contact-001",
      name: "Jordan Lee",
      email: "jordan.lee@example.com",
      phone: "+1-512-555-0142",
      role: "listing_agent"
    }
  ],
  ownership: {
    entityName: "PREI Riverfront Holdings LLC",
    ownershipPercent: 100,
    isPrimary: true
  }
  // Include any other required InvestorListing fields from your model
};

/** Draft listing — still being prepared; may use draft-only fields if your discriminated union requires them. */
export const sampleDraftListing: InvestorListing = {
  id: "listing-002",
  title: "Draft — Oak Street Retail Pad",
  status: "draft",
  propertyType: "retail",
  address: {
    line1: "88 Oak St",
    city: "Dallas",
    state: "TX",
    postalCode: "75201",
    country: "US"
  },
  financials: {
    askingPrice: 980000,
    noi: 0,
    capRate: 0,
    currency: "USD"
  },
  contacts: [],
  ownership: {
    entityName: "PREI Draft Vehicles LLC",
    ownershipPercent: 100,
    isPrimary: true
  }
};

/** Under-contract listing — exercises the under-contract status branch. */
export const sampleUnderContractListing: InvestorListing = {
  id: "listing-003",
  title: "Cedar Industrial — Under Contract",
  status: "under_contract",
  propertyType: "industrial",
  address: {
    line1: "4500 Cedar Blvd",
    city: "Houston",
    state: "TX",
    postalCode: "77002",
    country: "US"
  },
  financials: {
    askingPrice: 6100000,
    noi: 455000,
    capRate: 0.075,
    currency: "USD"
  },
  contacts: [
    {
      id: "contact-002",
      name: "Sam Rivera",
      email: "sam.rivera@example.com",
      role: "buyer_rep"
    }
  ],
  ownership: {
    entityName: "PREI Cedar JV",
    ownershipPercent: 60,
    isPrimary: true
  }
};

/** Closed listing — historical record still typed as InvestorListing. */
export const sampleClosedListing: InvestorListing = {
  id: "listing-004",
  title: "Summit Office — Closed",
  status: "closed",
  propertyType: "office",
  address: {
    line1: "1 Summit Plaza",
    city: "San Antonio",
    state: "TX",
    postalCode: "78205",
    country: "US"
  },
  financials: {
    askingPrice: 2750000,
    noi: 198000,
    capRate: 0.072,
    currency: "USD"
  },
  contacts: [
    {
      id: "contact-003",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      role: "seller_rep"
    }
  ],
  ownership: {
    entityName: "PREI Summit LLC",
    ownershipPercent: 100,
    isPrimary: true
  }
};

/** All valid samples — useful for later UI mocks and typecheck scripts. */
export const sampleInvestorListings: InvestorListing[] = [
  sampleActiveListing,
  sampleDraftListing,
  sampleUnderContractListing,
  sampleClosedListing
];