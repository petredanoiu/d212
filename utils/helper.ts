import type {
  DateIdentificareType,
  DateImputernicitType,
  FormElements,
  VenituriRomaniaType
} from '@/types/types';
import { saveAs } from 'file-saver';
import { defaultFormValues } from './nomenclatoare';

export function generateXML(formData: FormElements): string {
  const xmlParts = ['<?xml version="1.0"?>'];
  const header = [
    '<declaratie212 luna="12" an="2024"',
    `nume_c="${formData.dateIdentificare.nume}"`,
    `initiala_c="${formData.dateIdentificare.initialaTata}"`,
    `prenume_c="${formData.dateIdentificare.prenume}"`,
    `adresa_c="${formatAdresa(formData.dateIdentificare)}"`,
    `telefon_c="${formData.dateIdentificare.telefon}"`,
    `email_c="${formData.dateIdentificare.email}"`,
    `cif_c="${formData.dateIdentificare.cif}"`,
    `cif_i="${formData.dateImputernicit.cif}"`,
    `adresa_i="${formatAdresa(formData.dateImputernicit)}"`,
    `telefon_i="${formData.dateImputernicit.telefon}"`,
    `email_i="${formData.dateImputernicit.email}"`,
    `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="mfp:anafdgti:d212:declaratie:v1 d212.xsd" xmlns="mfp:anaf:dgti:d212:declaratie:v1">`,
  ].join(' ');
  xmlParts.push(header);

  const venituriXML = formData.venituriRomania
    .map(
      (venit) =>
        `<venit_romania index="${venit.id}" venit_brut="${venit.venitBrut}" cheltuieli="${venit.cheltuieli}" venit_net="${venit.venitNet}" pierdere_anuala="${venit.pierdereAnuala}" pierdere_precedenta="${venit.pierderePrecedenta}" pierdere_compensata="${venit.pierdereCompensata}" venit_impozabil="${venit.venitImpozabil}" venit_redus="${venit.venitRedus}" impozit_datorat="${venit.impozitDatorat}" denumire="${venit.denumire}" iban="${venit.iban}" cif="${venit.cif}" />`
    )
    .join('\n');

  xmlParts.push(venituriXML);
  xmlParts.push('</declaratie212>');

  return xmlParts.join('\n');
}

export function parseXML(xml: string): FormElements {
  const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');

  const rootNode = xmlDoc.getElementsByTagName('declaratie212')[0];
  const formData: FormElements = defaultFormValues;

  // Parse identification data
  formData.dateIdentificare.nume = rootNode.getAttribute('nume_c') || '';
  formData.dateIdentificare.initialaTata = rootNode.getAttribute('initiala_c') || '';
  formData.dateIdentificare.prenume = rootNode.getAttribute('prenume_c') || '';
  formData.dateIdentificare.cif = rootNode.getAttribute('cif_c') || '';
  formData.dateIdentificare.telefon = rootNode.getAttribute('telefon_c') || '';
  formData.dateIdentificare.email = rootNode.getAttribute('email_c') || '';

  // Parse contributor address
  const adresaContribuabil = rootNode.getAttribute('adresa_c') || '';
  parseAdresa(adresaContribuabil, formData.dateIdentificare);

  // Parse representative data
  formData.dateImputernicit.cif = rootNode.getAttribute('cif_i') || '';
  formData.dateImputernicit.telefon = rootNode.getAttribute('telefon_i') || '';
  formData.dateImputernicit.email = rootNode.getAttribute('email_i') || '';

  // Parse representative address
  const adresaImputernicit = rootNode.getAttribute('adresa_i') || '';
  parseAdresa(adresaImputernicit, formData.dateImputernicit);

  const venituri = Array.from(rootNode.children);
  if (venituri.length > 0) {
    formData.venituriRomania = venituri.map((venit) => {
      const element = venit as Element;
      return {
        id: Number(element.getAttribute('index')) || Date.now(),
        // Add all required fields from VenituriRomaniaType
        categorieVenit: element.getAttribute('categorie_venit') || '',
        determinareVenit: element.getAttribute('determinare_venit') || '',
        formaOrganizare: element.getAttribute('forma_organizare') || '',
        nomenclatorCAEN: element.getAttribute('nomenclator_caen') || '',
        dateIdentificareSediu: element.getAttribute('date_identificare_sediu') || '',
        numarDocument: element.getAttribute('numar_document') || '',
        dataDocument: element.getAttribute('data_document') || '',
        dataIncepere: element.getAttribute('data_incepere') || '',
        dataIncetare: element.getAttribute('data_incetare') || '',
        zileScutire: element.getAttribute('zile_scutire') || '',
        venitBrut: element.getAttribute('venit_brut') || '',
        cheltuieli: element.getAttribute('cheltuieli') || '',
        venitNet: element.getAttribute('venit_net') || '',
        pierdereAnuala: element.getAttribute('pierdere_anuala') || '',
        pierderePrecedenta: element.getAttribute('pierdere_precedenta') || '',
        pierdereCompensata: element.getAttribute('pierdere_compensata') || '',
        venitImpozabil: element.getAttribute('venit_impozabil') || '',
        venitRedus: element.getAttribute('venit_redus') || '',
        impozitDatorat: element.getAttribute('impozit_datorat') || '',
       denumire: element.getAttribute('denumire') || '',
      iban: element.getAttribute('iban') || '',
      cif: element.getAttribute('cif') || ''
      };
    });
  }
  return formData;
}

function formatAdresa(
  adresa: DateIdentificareType | DateImputernicitType
): string {
  return `starda ${adresa.strada} nr. ${adresa.numar} bl. ${adresa.bloc} sc. ${adresa.scara} et. ${adresa.etaj} ap. ${adresa.apartament} loc. ${adresa.localitate} jud. ${adresa.judet} cod postal ${adresa.codpostal}`;
}

function parseAdresa(adresaString: string, target: DateIdentificareType | DateImputernicitType) {
  const matches = adresaString.match(/strada (.*?) nr\. (.*?) bl\. (.*?) sc\. (.*?) et\. (.*?) ap\. (.*?) loc\. (.*?) jud\. (.*?) cod postal (.*?)$/);
  if (matches) {
    target.strada = matches[1] || '';
    target.numar = matches[2] || '';
    target.bloc = matches[3] || '';
    target.scara = matches[4] || '';
    target.etaj = matches[5] || '';
    target.apartament = matches[6] || '';
    target.localitate = matches[7] || '';
    target.judet = matches[8] || '';
    target.codpostal = matches[9] || '';
  }
}

export function saveXML(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/xml;charset=utf-8' });
  saveAs(blob, filename);
}

export const calculateNetIncome = (venit: VenituriRomaniaType) => {
  const venitBrut = parseInt(venit.venitBrut) || 0;
  const cheltuieli = parseInt(venit.cheltuieli) || 0;
  return (venitBrut - cheltuieli).toString();
};

export const calculateTaxableIncome = (venit: VenituriRomaniaType) => {
  const venitNet = parseInt(venit.venitNet) || 0;
  const pierdereCompensata = parseInt(venit.pierdereCompensata) || 0;
  return (venitNet - pierdereCompensata).toString();
};

export const calculateTax = (venit: VenituriRomaniaType) => {
  const venitImpozabil = parseInt(venit.venitImpozabil) || 0;
  const venitRedus = parseInt(venit.venitRedus) || 0;
  const baseVenit = venitRedus > 0 ? venitRedus : venitImpozabil;
  return Math.round(baseVenit * 0.1).toString();
};
