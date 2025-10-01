# Donators Section Guide

## Overview
A new "Donators" section has been added to the CipherHacks website to display individuals who have donated to the event and provide financial transparency through HCB (Hack Club Bank).

## Features Added

### 1. Donators Section (`/src/App.tsx`)
- Displays donator cards in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- Shows donator name, amount, optional message, and date
- Supports anonymous donations
- Falls back to a "Be the first to donate" message when no donators exist
- Includes financial transparency section with link to HCB
- CTA button to make donations

### 2. Data Structure (`/src/constants/index.ts`)
```typescript
export interface DonatorInfo {
  name: string;
  amount: number; // in USD
  message?: string; // optional message from donator
  date?: string; // donation date
  isAnonymous?: boolean;
}

export const DONATORS: DonatorInfo[] = [
  // Add donators here as they come in
];

export const HCB_TRANSPARENCY_URL = "https://hcb.hackclub.com/cipherhacks/transparency";
```

### 3. Navigation
- Added "Donators" to the main navigation menu with a CurrencyDollarIcon
- Located between "Sponsors" and "Team" sections

## How to Add Donators

### Example 1: Regular Donor
```typescript
export const DONATORS: DonatorInfo[] = [
  { 
    name: "John Doe", 
    amount: 100, 
    message: "Keep up the great work!", 
    date: "2025-01-15" 
  },
];
```

### Example 2: Anonymous Donor
```typescript
export const DONATORS: DonatorInfo[] = [
  { 
    name: "Anonymous", 
    amount: 250, 
    isAnonymous: true,
    date: "2025-01-20" 
  },
];
```

### Example 3: Multiple Donors
```typescript
export const DONATORS: DonatorInfo[] = [
  { 
    name: "John Doe", 
    amount: 100, 
    message: "Keep up the great work!", 
    date: "2025-01-15" 
  },
  { 
    name: "Jane Smith", 
    amount: 250, 
    message: "So proud of the CipherHacks team!",
    date: "2025-01-18" 
  },
  { 
    name: "Anonymous", 
    amount: 500, 
    isAnonymous: true,
    date: "2025-01-20" 
  },
];
```

## Financial Transparency

The section includes a prominent link to your HCB transparency page:
- **URL**: `https://hcb.hackclub.com/cipherhacks/transparency`
- This shows real-time financial transactions and ledger
- Builds trust with potential donors and attendees

## Styling

The donators section uses:
- Green color theme (`text-atom-green`, `border-atom-green`) to differentiate from sponsors
- Consistent card design with hover effects
- Responsive layout matching the rest of the site
- Money icon (💎) and visual emphasis on transparency

## Location

The Donators section is positioned:
1. After the Sponsors section
2. Before the Team section
3. Has a dark background (`bg-black bg-opacity-30`) to match the site's alternating pattern

## Notes

- All donations are noted as tax-deductible through Hack Club's 501(c)(3) status
- The section gracefully handles empty state
- Anonymous donors are fully supported
- The transparency link opens in a new tab
