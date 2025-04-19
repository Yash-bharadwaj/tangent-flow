
export type CountryData = {
  name: string;
  code: string;
  phoneCode: string;
};

export const countries: CountryData[] = [
  { name: "United States", code: "US", phoneCode: "+1" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44" },
  { name: "India", code: "IN", phoneCode: "+91" },
  { name: "China", code: "CN", phoneCode: "+86" },
  { name: "Japan", code: "JP", phoneCode: "+81" },
  { name: "Germany", code: "DE", phoneCode: "+49" },
  { name: "France", code: "FR", phoneCode: "+33" },
  { name: "Italy", code: "IT", phoneCode: "+39" },
  { name: "Canada", code: "CA", phoneCode: "+1" },
  { name: "Australia", code: "AU", phoneCode: "+61" },
  // Add more countries as needed
];
