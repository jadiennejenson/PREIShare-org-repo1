export type InvestorListing = {
  id: string;
  title: string;
  status: "active" | "draft" | "under_contract" | "closed";
  propertyType: "multifamily" | "retail" | "industrial" | "office";
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  financials: {
    askingPrice: number;
    noi: number;
    capRate: number;
    currency: string;
  };
  contacts: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: "listing_agent" | "buyer_rep" | "seller_rep";
  }[];
  ownership: {
    entityName: string;
    ownershipPercent: number;
    isPrimary: boolean;
  };
};