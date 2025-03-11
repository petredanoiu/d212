import { FormElements, OptionType, VenituriRomaniaType } from '@/types/types';

// nume declaratie
export const numeDeclaratie = 'D212';

// explicație declaratie
export const explicatieDeclaratie =
  'Declaratie privind impozitul pe venit si contributiile sociale datorate de persoanele fizice';

// nume fisier xml
export const numeFisierXml = 'declaratie230.xml';

// lista de judete
export const listaJudete: OptionType[] = [
  { id: '1', name: 'ALBA' },
  { id: '2', name: 'ARAD' },
  { id: '3', name: 'ARGEȘ' },
  { id: '4', name: 'BACĂU' },
  { id: '5', name: 'BIHOR' },
  { id: '6', name: 'BISTRIȚA-NĂSĂUD' },
  { id: '7', name: 'BOTOȘANI' },
  { id: '9', name: 'BRĂILA' },
  { id: '8', name: 'BRAȘOV' },
  { id: '10', name: 'BUZAU' },
  { id: '51', name: 'CĂLĂRAȘI' },
  { id: '11', name: 'CARAȘ-SEVERIN' },
  { id: '12', name: 'CLUJ' },
  { id: '13', name: 'CONSTANȚA' },
  { id: '14', name: 'COVASNA' },
  { id: '15', name: 'DIMBOVIȚA' },
  { id: '16', name: 'DOLJ' },
  { id: '17', name: 'GALAȚI' },
  { id: '52', name: 'GIURGIU' },
  { id: '18', name: 'GORJ' },
  { id: '19', name: 'HARGHITA' },
  { id: '20', name: 'HUNEDOARA' },
  { id: '21', name: 'IALOMIȚA' },
  { id: '22', name: 'IAȘI' },
  { id: '23', name: 'ILFOV' },
  { id: '24', name: 'MARAMUREȘ' },
  { id: '25', name: 'MEHEDINȚI' },
  { id: '26', name: 'MUREȘ' },
  { id: '27', name: 'NEAMȚ' },
  { id: '28', name: 'OLT' },
  { id: '29', name: 'PRAHOVA' },
  { id: '30', name: 'SATU MARE' },
  { id: '31', name: 'SĂLAJ' },
  { id: '32', name: 'SIBIU' },
  { id: '33', name: 'SUCEAVA' },
  { id: '34', name: 'TELEORMAN' },
  { id: '35', name: 'TIMIȘ' },
  { id: '36', name: 'TULCEA' },
  { id: '37', name: 'VASLUI' },
  { id: '38', name: 'VÂLCEA' },
  { id: '39', name: 'VRANCEA' },
  { id: '41', name: 'BUCUREȘTI/SECTOR1' },
  { id: '42', name: 'BUCUREȘTI/SECTOR2' },
  { id: '43', name: 'BUCUREȘTI/SECTOR3' },
  { id: '44', name: 'BUCUREȘTI/SECTOR4' },
  { id: '45', name: 'BUCUREȘTI/SECTOR5' },
  { id: '46', name: 'BUCUREȘTI/SECTOR6' },
];

// lista de tipuri de persoane
export const tipPersoane: OptionType[] = [
  { id: '1', name: 'Persoana Fizica' },
  { id: '2', name: 'Persoana Juridica' },
];

// lista de pagini afisate in menniu
export const pagini = [
  { id: 1, title: 'Date Personale', href: '/dateIdentificare' },
  { id: 2, title: 'Imputernicit', href: '/dateImputernicit' },
  { id: 3, title: 'Venituri din România', href: '/venituri' },
  { id: 4, title: 'Venituri din strainatate', href: '/venituri-strainatate' },
  { id: 5, title: 'CAS', href: '/cas' },
  { id: 6, title: 'CASS', href: '/cass' },
];

// valori default pentru declaratie
export const defaultFormValues: FormElements = {
  dateIdentificare: {
    initialaTata: '',
    nume: '',
    prenume: '',
    apartament: '',
    bloc: '',
    codpostal: '',
    etaj: '',
    judet: '',
    localitate: '',
    numar: '',
    scara: '',
    strada: '',
    email: '',
    telefon: '',
    cif: '',
  },
  dateImputernicit: {
    initialaTata: '',
    nume: '',
    prenume: '',
    denumire: '',
    iban: '',
    apartament: '',
    bloc: '',
    codpostal: '',
    etaj: '',
    judet: '',
    localitate: '',
    numar: '',
    scara: '',
    strada: '',
    email: '',
    telefon: '',
    cif: '',
    tipPersoana: '0',
  },
  venituriRomania: [
    {
      id: Date.now(),
      categorieVenit: '',
      determinareVenit: '',
      formaOrganizare: '',
      nomenclatorCAEN: '',
      dateIdentificareSediu: '',
      numarDocument: '',
      dataDocument: '',
      dataIncepere: '',
      dataIncetare: '',
      zileScutire: '',
      venitBrut: '',
      cheltuieli: '',
      venitNet: '',
      pierdereAnuala: '',
      pierderePrecedenta: '',
      pierdereCompensata: '',
      venitImpozabil: '',
      venitRedus: '',
      impozitDatorat: '',
    },
  ] as VenituriRomaniaType[],
  venituriStrainatate: [
    {
      id: Date.now(),
      categorieVenitStrainatate: '',
      taraVenit: '',
      evitareDublaImpunere: '',
      venitScutitAcordInternational: false,
      dataIncepereStrainatate: '', // Added
      dataIncetareStrainatate: '', // Added
      venitBrutStrainatate: '',
      cheltuieliStrainatate: '',
      venitNetStrainatate: '',
      pierdereAnualaStrainatate: '',
      pierderePrecedentaStrainatate: '',
      pierdereCompensataStrainatate: '',
      venitImpozabilStrainatate: '',
      impozitDatoratInRomania: '',
      impozitPlatitStrainatate: '',
      creditFiscal: '',
      diferentaImpozitDePlata: '',
    },
  ],
  cas: {
    optiuneCAS: '1',
    totalVenituri: '',
    bazaCalcul: '',
    casDatorat: '',
    casRetinut: '',
    diferenta: '',
  },
  cass: {
    optiuneCASS: '1',
    totalVenituri: '',
    bazaCalcul: '',
    cassDatorat: '',
    cassRetinut_6: '',
    diferentaPlus_6: '',
    diferentaMinus_6: '',
    cassRetinut_7: '',
    diferentaMinus_7: '',
  },
};
