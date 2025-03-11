type EntitateNonProfitType = {
  id: number;
  procentImpozit: string;
  sumaNp: string;
  venitBrut: string;
  optiune2ani: boolean;
  cif: string;
  denumire: string;
  iban: string;
};

export const validateEntitateNonProfit = (data: EntitateNonProfitType) => {
  if (!data.venitBrut) {
    return 'Venit brut este obligatoriu';
  }
  if (!data.procentImpozit) {
    return 'Procent impozit este obligatoriu';
  }
  if (!data.sumaNp) {
    return 'Suma este obligatorie';
  }
  if (!data.cif) {
    return 'CIF este obligatoriu';
  }
  if (!data.denumire) {
    return 'Denumire este obligatorie';
  }
  if (!data.iban) {
    return 'IBAN este obligatoriu';
  }
  return null;
};
