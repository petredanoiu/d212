type PersonDataType = {
  initialaTata: string;
  nume: string;
  prenume: string;
};
export type EntityDataType = {
  denumire: string;
  iban: string;
};
export type Adresa = {
  apartament: string;
  bloc: string;
  codpostal: string;
  etaj: string;
  judet: string;
  localitate: string;
  numar: string;
  scara: string;
  strada: string;
};

export type Contact = {
  email: string;
  telefon: string;
};

export type DateIdentificareType = PersonDataType &
  Adresa &
  Contact & { cif: string };
export type DateImputernicitType = PersonDataType &
  EntityDataType &
  Adresa &
  Contact & {
    cif: string;
    tipPersoana: string;
  };
// venituri din romania
export type VenituriRomaniaType = {
  id: number;
  // Activity form types
  categorieVenit: string;
  determinareVenit: string;
  formaOrganizare: string;
  nomenclatorCAEN: string;
  dateIdentificareSediu: string;
  numarDocument: string;
  dataDocument: string;
  dataIncepere: string;
  dataIncetare: string;
  zileScutire: string;
   // Income form types
  venitBrut: string;
  cheltuieli: string;
  venitNet: string;
  pierdereAnuala: string;
  pierderePrecedenta: string;
  pierdereCompensata: string;
  venitImpozabil: string;
  venitRedus: string;
  impozitDatorat: string;
  //impozitDatoratInRomania: string;
  //impozitPlatitStrainatate: string;
  //creditFiscal: string;
  //diferentaImpozitDePlata: string;
};

//venituri din strainatate
export type VenituriStrainatateType = {
  id: number;
  categorieVenitStrainatate: string;
  taraVenit: string;
  evitareDublaImpunere: string;
  venitScutitAcordInternational: boolean;
  dataIncepereStrainatate: string;  // Added
  dataIncetareStrainatate: string;  // Added
  venitBrutStrainatate: string;
  cheltuieliStrainatate: string;
  venitNetStrainatate: string;
  pierdereAnualaStrainatate: string;
  pierderePrecedentaStrainatate: string;
  pierdereCompensataStrainatate: string;
  venitImpozabilStrainatate: string;
  impozitDatoratInRomania: string;
  impozitPlatitStrainatate: string;
  creditFiscal: string;
  diferentaImpozitDePlata: string;
};
export type VenitFormData = {
  id: number;
  categorieVenit: string;
  determinareVenit: string;
  formaOrganizare: string;
  nomenclatorCAEN: string;
  dateIdentificareSediu: string;
  numarDocument: string;
  dataDocument: string;
  dataIncepere: string;
  dataIncetare: string;
  zileScutire: string;
  venitBrut: string;
  cheltuieli: string;
  venitNet: string;
  pierdereAnuala: string;
  pierderePrecedenta: string;
  pierdereCompensata: string;
  venitImpozabil: string;
  venitRedus: string;
  impozitDatorat: string;
};

export interface FormElements {
  dateIdentificare: DateIdentificareType;
  dateImputernicit: DateImputernicitType;
  venituriRomania: VenituriRomaniaType[];  // Updated from destinatii
  venituriStrainatate: VenituriStrainatateType[];
  cas: CASType;
  cass: CASSType;
  
}

export type PageModules =
  | 'dateIdentificare'
  | 'dateImputernicit'
  | 'venituriRomania'
  | 'venituriStrainatate' 
  | 'cas' 
  | 'cass'; 

// pentru elemente de tip dropdown (select) declaram tipul:
export type OptionType = {
  id: string;
  name: string;
};

export type Country = {
  code: string;
  name: string;
  isEU: boolean;
};

//elementele paginii CAS
export type CASType = {
  optiuneCAS: string;
  totalVenituri: string;
  bazaCalcul: string;
  casDatorat: string;
  casRetinut: string;
  diferenta: string;
};

//elementele paginii CASS
export interface CASSType {
  optiuneCASS: string;
  totalVenituri: string;
  bazaCalcul: string;
  cassDatorat: string;
  cassRetinut_6: string;
  diferentaPlus_6: string;
  diferentaMinus_6: string;
  cassRetinut_7: string;
  diferentaMinus_7: string;
}