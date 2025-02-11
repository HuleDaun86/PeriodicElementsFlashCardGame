import React, { useState, useMemo } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const periodicTableData = [
    { symbol: 'H', mass: '1.008', atomicNumber: 1, fullName: 'Väte', englishName: 'Hydrogen', type: 'Ickemetall', uses: 'Bränsle, forskningsinstrument' },
    { symbol: 'He', mass: '4.003', atomicNumber: 2, fullName: 'Helium', englishName: 'Helium', type: 'Ädelgas', uses: 'Kylmedel, ballonger' },
    { symbol: 'Li', mass: '6.941', atomicNumber: 3, fullName: 'Litium', englishName: 'Lithium', type: 'Alkalimetall', uses: 'Batterier, kärnteknologi' },
    { symbol: 'Be', mass: '9.012', atomicNumber: 4, fullName: 'Beryllium', englishName: 'Beryllium', type: 'Alkalisk jordmetall', uses: 'Rymdteknik, kärnreaktorer' },
    { symbol: 'B', mass: '10.81', atomicNumber: 5, fullName: 'Bor', englishName: 'Boron', type: 'Metalloid', uses: 'Hård keramik, raketer' },
    { symbol: 'C', mass: '12.01', atomicNumber: 6, fullName: 'Kol', englishName: 'Carbon', type: 'Ickemetall', uses: 'Bränsle, kolföreningar' },
    { symbol: 'N', mass: '14.01', atomicNumber: 7, fullName: 'Kväve', englishName: 'Nitrogen', type: 'Ickemetall', uses: 'Gödningsmedel, atmosfär' },
    { symbol: 'O', mass: '16.00', atomicNumber: 8, fullName: 'Syre', englishName: 'Oxygen', type: 'Ickemetall', uses: 'Andning, förbränning' },
    { symbol: 'F', mass: '19.00', atomicNumber: 9, fullName: 'Fluor', englishName: 'Fluorine', type: 'Halogen', uses: 'Tandkräm, kemiska processer' },
    { symbol: 'Ne', mass: '20.18', atomicNumber: 10, fullName: 'Neon', englishName: 'Neon', type: 'Ädelgas', uses: 'Belysning, lasrar' },
    { symbol: 'Na', mass: '22.99', atomicNumber: 11, fullName: 'Natrium', englishName: 'Sodium', type: 'Alkalimetall', uses: 'Saltproduktion, elektrolys' },
    { symbol: 'Mg', mass: '24.31', atomicNumber: 12, fullName: 'Magnesium', englishName: 'Magnesium', type: 'Alkalisk jordmetall', uses: 'Legeringar, medicin' },
    { symbol: 'Al', mass: '26.98', atomicNumber: 13, fullName: 'Aluminium', englishName: 'Aluminum', type: 'Post-transition metall', uses: 'Flygplan, burkar' },
    { symbol: 'Si', mass: '28.09', atomicNumber: 14, fullName: 'Kisel', englishName: 'Silicon', type: 'Metalloid', uses: 'Elektronik, glas' },
    { symbol: 'P', mass: '30.97', atomicNumber: 15, fullName: 'Fosfor', englishName: 'Phosphorus', type: 'Ickemetall', uses: 'Gödningsmedel, tändstickor' },
    { symbol: 'S', mass: '32.07', atomicNumber: 16, fullName: 'Svavel', englishName: 'Sulfur', type: 'Ickemetall', uses: 'Svavelsyra, gummi' },
    { symbol: 'Cl', mass: '35.45', atomicNumber: 17, fullName: 'Klor', englishName: 'Chlorine', type: 'Halogen', uses: 'Desinfektion, PVC' },
    { symbol: 'Ar', mass: '39.95', atomicNumber: 18, fullName: 'Argon', englishName: 'Argon', type: 'Ädelgas', uses: 'Belysning, svetsning' },
    { symbol: 'K', mass: '39.10', atomicNumber: 19, fullName: 'Kalium', englishName: 'Potassium', type: 'Alkalimetall', uses: 'Gödningsmedel, medicin' },
    { symbol: 'Ca', mass: '40.08', atomicNumber: 20, fullName: 'Kalcium', englishName: 'Calcium', type: 'Alkalisk jordmetall', uses: 'Byggmaterial, kosttillskott' },
    { symbol: 'Sc', mass: '44.96', atomicNumber: 21, fullName: 'Skandium', englishName: 'Scandium', type: 'Övergångsmetall', uses: 'Lysrör, legeringar' },
    { symbol: 'Ti', mass: '47.87', atomicNumber: 22, fullName: 'Titan', englishName: 'Titanium', type: 'Övergångsmetall', uses: 'Flygplan, implantat' },
    { symbol: 'V', mass: '50.94', atomicNumber: 23, fullName: 'Vanadin', englishName: 'Vanadium', type: 'Övergångsmetall', uses: 'Stålproduktion, katalysatorer' },
    { symbol: 'Cr', mass: '52.00', atomicNumber: 24, fullName: 'Krom', englishName: 'Chromium', type: 'Övergångsmetall', uses: 'Rostfritt stål, beläggningar' },
    { symbol: 'Mn', mass: '54.94', atomicNumber: 25, fullName: 'Mangan', englishName: 'Manganese', type: 'Övergångsmetall', uses: 'Stålproduktion, batterier' },
    { symbol: 'Fe', mass: '55.85', atomicNumber: 26, fullName: 'Järn', englishName: 'Iron', type: 'Övergångsmetall', uses: 'Stålproduktion, byggmaterial' },
    { symbol: 'Co', mass: '58.93', atomicNumber: 27, fullName: 'Kobolt', englishName: 'Cobalt', type: 'Övergångsmetall', uses: 'Batterier, legeringar' },
    { symbol: 'Ni', mass: '58.69', atomicNumber: 28, fullName: 'Nickel', englishName: 'Nickel', type: 'Övergångsmetall', uses: 'Legeringar, batterier' },
    { symbol: 'Cu', mass: '63.55', atomicNumber: 29, fullName: 'Koppar', englishName: 'Copper', type: 'Övergångsmetall', uses: 'Elektriska ledningar, mynt' },
    { symbol: 'Zn', mass: '65.38', atomicNumber: 30, fullName: 'Zink', englishName: 'Zinc', type: 'Övergångsmetall', uses: 'Galvanisering, legeringar' },
    { symbol: 'Ga', mass: '69.72', atomicNumber: 31, fullName: 'Gallium', englishName: 'Gallium', type: 'Post-transition metall', uses: 'Elektronik, LED' },
    { symbol: 'Ge', mass: '72.63', atomicNumber: 32, fullName: 'Germanium', englishName: 'Germanium', type: 'Metalloid', uses: 'Elektronik, fiberoptik' },
    { symbol: 'As', mass: '74.92', atomicNumber: 33, fullName: 'Arsenik', englishName: 'Arsenic', type: 'Metalloid', uses: 'Bekämpningsmedel, halvledare' },
    { symbol: 'Se', mass: '78.96', atomicNumber: 34, fullName: 'Selen', englishName: 'Selenium', type: 'Ickemetall', uses: 'Elektronik, glasproduktion' },
    { symbol: 'Br', mass: '79.90', atomicNumber: 35, fullName: 'Brom', englishName: 'Bromine', type: 'Halogen', uses: 'Flamskyddsmedel, medicin' },
    { symbol: 'Kr', mass: '83.80', atomicNumber: 36, fullName: 'Krypton', englishName: 'Krypton', type: 'Ädelgas', uses: 'Belysning, lasrar' },
    { symbol: 'Rb', mass: '85.47', atomicNumber: 37, fullName: 'Rubidium', englishName: 'Rubidium', type: 'Alkalimetall', uses: 'Forskning, atomklockor' },
    { symbol: 'Sr', mass: '87.62', atomicNumber: 38, fullName: 'Strontium', englishName: 'Strontium', type: 'Alkalisk jordmetall', uses: 'Fyrverkerier, medicin' },
    { symbol: 'Y', mass: '88.91', atomicNumber: 39, fullName: 'Yttrium', englishName: 'Yttrium', type: 'Övergångsmetall', uses: 'LED, fosforer' },
    { symbol: 'Zr', mass: '91.22', atomicNumber: 40, fullName: 'Zirkonium', englishName: 'Zirconium', type: 'Övergångsmetall', uses: 'Kärnreaktorer, smycken' },
    { symbol: 'Nb', mass: '92.91', atomicNumber: 41, fullName: 'Niob', englishName: 'Niobium', type: 'Övergångsmetall', uses: 'Stålproduktion, supraledare' },
    { symbol: 'Mo', mass: '95.95', atomicNumber: 42, fullName: 'Molybden', englishName: 'Molybdenum', type: 'Övergångsmetall', uses: 'Legeringar, katalysatorer' },
    { symbol: 'Tc', mass: '98', atomicNumber: 43, fullName: 'Teknetium', englishName: 'Technetium', type: 'Övergångsmetall', uses: 'Medicin, forskning' },
    { symbol: 'Ru', mass: '101.1', atomicNumber: 44, fullName: 'Rutenium', englishName: 'Ruthenium', type: 'Övergångsmetall', uses: 'Elektronik, katalysatorer' },
    { symbol: 'Rh', mass: '102.9', atomicNumber: 45, fullName: 'Rodium', englishName: 'Rhodium', type: 'Övergångsmetall', uses: 'Katalysatorer, smycken' },
    { symbol: 'Pd', mass: '106.4', atomicNumber: 46, fullName: 'Palladium', englishName: 'Palladium', type: 'Övergångsmetall', uses: 'Katalysatorer, smycken' },
    { symbol: 'Ag', mass: '107.9', atomicNumber: 47, fullName: 'Silver', englishName: 'Silver', type: 'Övergångsmetall', uses: 'Smycken, elektronik' },
    { symbol: 'Cd', mass: '112.4', atomicNumber: 48, fullName: 'Kadmium', englishName: 'Cadmium', type: 'Övergångsmetall', uses: 'Batterier, pigment' },
    { symbol: 'In', mass: '114.8', atomicNumber: 49, fullName: 'Indium', englishName: 'Indium', type: 'Post-transition metall', uses: 'Elektronik, legeringar' },
    { symbol: 'Sn', mass: '118.7', atomicNumber: 50, fullName: 'Tenn', englishName: 'Tin', type: 'Post-transition metall', uses: 'Legeringar, lödning' }
    { symbol: 'Sb', mass: '121.8', atomicNumber: 51, fullName: 'Antimon', englishName: 'Antimony', type: 'Metalloid', uses: 'Flamskyddsmedel, legeringar' },
    { symbol: 'Te', mass: '127.6', atomicNumber: 52, fullName: 'Tellur', englishName: 'Tellurium', type: 'Metalloid', uses: 'Elektronik, legeringar' },
    { symbol: 'I', mass: '126.9', atomicNumber: 53, fullName: 'Jod', englishName: 'Iodine', type: 'Halogen', uses: 'Desinfektion, medicin' },
    { symbol: 'Xe', mass: '131.3', atomicNumber: 54, fullName: 'Xenon', englishName: 'Xenon', type: 'Ädelgas', uses: 'Belysning, lasrar' },
    { symbol: 'Cs', mass: '132.9', atomicNumber: 55, fullName: 'Cesium', englishName: 'Cesium', type: 'Alkalimetall', uses: 'Atomklockor, borrvätskor' },
    { symbol: 'Ba', mass: '137.3', atomicNumber: 56, fullName: 'Barium', englishName: 'Barium', type: 'Alkalisk jordmetall', uses: 'Röntgenkontrastmedel, fyrverkerier' },
    { symbol: 'La', mass: '138.9', atomicNumber: 57, fullName: 'Lantan', englishName: 'Lanthanum', type: 'Lantanid', uses: 'Katalysatorer, optik' },
    { symbol: 'Ce', mass: '140.1', atomicNumber: 58, fullName: 'Cerium', englishName: 'Cerium', type: 'Lantanid', uses: 'Katalysatorer, glaspolering' },
    { symbol: 'Pr', mass: '140.9', atomicNumber: 59, fullName: 'Praseodym', englishName: 'Praseodymium', type: 'Lantanid', uses: 'Magneter, glasfärgning' },
    { symbol: 'Nd', mass: '144.2', atomicNumber: 60, fullName: 'Neodym', englishName: 'Neodymium', type: 'Lantanid', uses: 'Magneter, lasrar' },
    { symbol: 'Pm', mass: '145', atomicNumber: 61, fullName: 'Prometium', englishName: 'Promethium', type: 'Lantanid', uses: 'Forskning, lysdioder' },
    { symbol: 'Sm', mass: '150.4', atomicNumber: 62, fullName: 'Samarium', englishName: 'Samarium', type: 'Lantanid', uses: 'Magneter, kärnreaktorer' },
    { symbol: 'Eu', mass: '152.0', atomicNumber: 63, fullName: 'Europium', englishName: 'Europium', type: 'Lantanid', uses: 'Fosforer, kärnreaktorer' },
    { symbol: 'Gd', mass: '157.3', atomicNumber: 64, fullName: 'Gadolinium', englishName: 'Gadolinium', type: 'Lantanid', uses: 'MRI-kontrastmedel, magneter' },
    { symbol: 'Tb', mass: '158.9', atomicNumber: 65, fullName: 'Terbium', englishName: 'Terbium', type: 'Lantanid', uses: 'Fosforer, magneter' },
    { symbol: 'Dy', mass: '162.5', atomicNumber: 66, fullName: 'Dysprosium', englishName: 'Dysprosium', type: 'Lantanid', uses: 'Magneter, lasrar' },
    { symbol: 'Ho', mass: '164.9', atomicNumber: 67, fullName: 'Holmium', englishName: 'Holmium', type: 'Lantanid', uses: 'Magneter, lasrar' },
    { symbol: 'Er', mass: '167.3', atomicNumber: 68, fullName: 'Erbium', englishName: 'Erbium', type: 'Lantanid', uses: 'Fiberoptik, lasrar' },
    { symbol: 'Tm', mass: '168.9', atomicNumber: 69, fullName: 'Tulium', englishName: 'Thulium', type: 'Lantanid', uses: 'Lasrar, medicin' },
    { symbol: 'Yb', mass: '173.0', atomicNumber: 70, fullName: 'Ytterbium', englishName: 'Ytterbium', type: 'Lantanid', uses: 'Lasrar, legeringar' },
    { symbol: 'Lu', mass: '175.0', atomicNumber: 71, fullName: 'Lutetium', englishName: 'Lutetium', type: 'Lantanid', uses: 'Petroleumraffinering, medicin' },
    { symbol: 'Hf', mass: '178.5', atomicNumber: 72, fullName: 'Hafnium', englishName: 'Hafnium', type: 'Övergångsmetall', uses: 'Kärnreaktorer, legeringar' },
    { symbol: 'Ta', mass: '180.9', atomicNumber: 73, fullName: 'Tantal', englishName: 'Tantalum', type: 'Övergångsmetall', uses: 'Elektronik, legeringar' },
    { symbol: 'W', mass: '183.8', atomicNumber: 74, fullName: 'Wolfram', englishName: 'Tungsten', type: 'Övergångsmetall', uses: 'Glödlampor, legeringar' },
    { symbol: 'Re', mass: '186.2', atomicNumber: 75, fullName: 'Rhenium', englishName: 'Rhenium', type: 'Övergångsmetall', uses: 'Jetmotorer, katalysatorer' },
    { symbol: 'Os', mass: '190.2', atomicNumber: 76, fullName: 'Osmium', englishName: 'Osmium', type: 'Övergångsmetall', uses: 'Legeringar, elektriska kontakter' },
    { symbol: 'Ir', mass: '192.2', atomicNumber: 77, fullName: 'Iridium', englishName: 'Iridium', type: 'Övergångsmetall', uses: 'Legeringar, katalysatorer' },
    { symbol: 'Pt', mass: '195.1', atomicNumber: 78, fullName: 'Platina', englishName: 'Platinum', type: 'Övergångsmetall', uses: 'Smycken, katalysatorer' },
    { symbol: 'Au', mass: '197.0', atomicNumber: 79, fullName: 'Guld', englishName: 'Gold', type: 'Övergångsmetall', uses: 'Smycken, elektronik' },
    { symbol: 'Hg', mass: '200.6', atomicNumber: 80, fullName: 'Kvicksilver', englishName: 'Mercury', type: 'Övergångsmetall', uses: 'Termometrar, barometrar' },
    { symbol: 'Tl', mass: '204.4', atomicNumber: 81, fullName: 'Tallium', englishName: 'Thallium', type: 'Post-transition metall', uses: 'Elektronik, medicin' },
    { symbol: 'Pb', mass: '207.2', atomicNumber: 82, fullName: 'Bly', englishName: 'Lead', type: 'Post-transition metall', uses: 'Batterier, skydd mot strålning' },
    { symbol: 'Bi', mass: '208.9', atomicNumber: 83, fullName: 'Vismut', englishName: 'Bismuth', type: 'Post-transition metall', uses: 'Lödning, medicin' },
    { symbol: 'Po', mass: '209', atomicNumber: 84, fullName: 'Polonium', englishName: 'Polonium', type: 'Metalloid', uses: 'Antistatisk utrustning, forskning' },
    { symbol: 'At', mass: '210', atomicNumber: 85, fullName: 'Astat', englishName: 'Astatine', type: 'Halogen', uses: 'Forskning, medicin' },
    { symbol: 'Rn', mass: '222', atomicNumber: 86, fullName: 'Radon', englishName: 'Radon', type: 'Ädelgas', uses: 'Cancerbehandling, forskning' },
    { symbol: 'Fr', mass: '223', atomicNumber: 87, fullName: 'Francium', englishName: 'Francium', type: 'Alkalimetall', uses: 'Forskning' },
    { symbol: 'Ra', mass: '226', atomicNumber: 88, fullName: 'Radium', englishName: 'Radium', type: 'Alkalisk jordmetall', uses: 'Cancerbehandling, forskning' },
    { symbol: 'Ac', mass: '227', atomicNumber: 89, fullName: 'Aktinium', englishName: 'Actinium', type: 'Aktinid', uses: 'Forskning, cancerbehandling' },
    { symbol: 'Th', mass: '232.0', atomicNumber: 90, fullName: 'Torium', englishName: 'Thorium', type: 'Aktinid', uses: 'Kärnbränsle, legeringar' },
    { symbol: 'Pa', mass: '231.0', atomicNumber: 91, fullName: 'Protaktinium', englishName: 'Protactinium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'U', mass: '238.0', atomicNumber: 92, fullName: 'Uran', englishName: 'Uranium', type: 'Aktinid', uses: 'Kärnbränsle, vapen' },
    { symbol: 'Np', mass: '237', atomicNumber: 93, fullName: 'Neptunium', englishName: 'Neptunium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Pu', mass: '244', atomicNumber: 94, fullName: 'Plutonium', englishName: 'Plutonium', type: 'Aktinid', uses: 'Kärnbränsle, vapen' },
    { symbol: 'Am', mass: '243', atomicNumber: 95, fullName: 'Americium', englishName: 'Americium', type: 'Aktinid', uses: 'Rökdetektorer, forskning' },
    { symbol: 'Cm', mass: '247', atomicNumber: 96, fullName: 'Curium', englishName: 'Curium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Bk', mass: '247', atomicNumber: 97, fullName: 'Berkelium', englishName: 'Berkelium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Cf', mass: '251', atomicNumber: 98, fullName: 'Californium', englishName: 'Californium', type: 'Aktinid', uses: 'Neutronkällor, forskning' },
    { symbol: 'Es', mass: '252', atomicNumber: 99, fullName: 'Einsteinium', englishName: 'Einsteinium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Fm', mass: '257', atomicNumber: 100, fullName: 'Fermium', englishName: 'Fermium', type: 'Aktinid', uses: 'Forskning' }
    { symbol: 'Md', mass: '258', atomicNumber: 101, fullName: 'Mendelevium', englishName: 'Mendelevium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'No', mass: '259', atomicNumber: 102, fullName: 'Nobelium', englishName: 'Nobelium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Lr', mass: '262', atomicNumber: 103, fullName: 'Lawrencium', englishName: 'Lawrencium', type: 'Aktinid', uses: 'Forskning' },
    { symbol: 'Rf', mass: '267', atomicNumber: 104, fullName: 'Rutherfordium', englishName: 'Rutherfordium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Db', mass: '270', atomicNumber: 105, fullName: 'Dubnium', englishName: 'Dubnium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Sg', mass: '271', atomicNumber: 106, fullName: 'Seaborgium', englishName: 'Seaborgium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Bh', mass: '270', atomicNumber: 107, fullName: 'Bohrium', englishName: 'Bohrium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Hs', mass: '277', atomicNumber: 108, fullName: 'Hassium', englishName: 'Hassium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Mt', mass: '276', atomicNumber: 109, fullName: 'Meitnerium', englishName: 'Meitnerium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Ds', mass: '281', atomicNumber: 110, fullName: 'Darmstadtium', englishName: 'Darmstadtium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Rg', mass: '282', atomicNumber: 111, fullName: 'Röntgenium', englishName: 'Roentgenium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Cn', mass: '285', atomicNumber: 112, fullName: 'Copernicium', englishName: 'Copernicium', type: 'Övergångsmetall', uses: 'Forskning' },
    { symbol: 'Nh', mass: '286', atomicNumber: 113, fullName: 'Nihonium', englishName: 'Nihonium', type: 'Post-transition metall', uses: 'Forskning' },
    { symbol: 'Fl', mass: '289', atomicNumber: 114, fullName: 'Flerovium', englishName: 'Flerovium', type: 'Post-transition metall', uses: 'Forskning' },
    { symbol: 'Mc', mass: '290', atomicNumber: 115, fullName: 'Moscovium', englishName: 'Moscovium', type: 'Post-transition metall', uses: 'Forskning' },
    { symbol: 'Lv', mass: '293', atomicNumber: 116, fullName: 'Livermorium', englishName: 'Livermorium', type: 'Post-transition metall', uses: 'Forskning' },
    { symbol: 'Ts', mass: '294', atomicNumber: 117, fullName: 'Tennessine', englishName: 'Tennessine', type: 'Halogen', uses: 'Forskning' },
    { symbol: 'Og', mass: '294', atomicNumber: 118, fullName: 'Oganesson', englishName: 'Oganesson', type: 'Ädel syntetisk', uses: 'Forskning' }
];

const PeriodicTableFlashcards = () => {
  const [remainingCards, setRemainingCards] = useState([...periodicTableData]);
  const [currentCard, setCurrentCard] = useState(null);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const drawCard = () => {
    if (remainingCards.length === 0) {
      setRemainingCards([...periodicTableData]);
      setIncorrectCards([]);
    }

    const card = remainingCards[Math.floor(Math.random() * remainingCards.length)];
    setCurrentCard(card);
    setIsFlipped(false);
  };

  const handleCorrect = () => {
    setRemainingCards(remainingCards.filter(card => card !== currentCard));
    drawCard();
  };

  const handleIncorrect = () => {
    setIncorrectCards([...incorrectCards, currentCard]);
    drawCard();
  };

  const renderCard = () => {
    if (!currentCard) return null;

    return (
      <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
        {!isFlipped ? (
          <div 
            onClick={() => setIsFlipped(true)} 
            className="cursor-pointer text-2xl font-bold p-8 bg-blue-100 rounded-lg text-center"
          >
            <div className="text-sm mb-1">{currentCard.atomicNumber}</div>
            <div>{currentCard.symbol}</div>
            <div className="text-sm mt-1">{currentCard.mass}</div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{currentCard.fullName}</h2>
            <p><strong>English Name:</strong> {currentCard.englishName}</p>
            <p><strong>Typ:</strong> {currentCard.type}</p>
            <p><strong>Användningsområden:</strong> {currentCard.uses}</p>
            <p><strong>Atomnummer:</strong> {currentCard.atomicNumber}</p>
            <p><strong>Atommassa:</strong> {currentCard.mass}</p>
            
            <div className="flex justify-center space-x-4 mt-4">
              <Button onClick={handleCorrect} className="bg-green-500 text-white">
                Rätt
              </Button>
              <Button onClick={handleIncorrect} className="bg-red-500 text-white">
                Fel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Periodiska Systemets Flashcards</h1>
      
      {currentCard ? (
        <div className="mb-6">{renderCard()}</div>
      ) : (
        <Button onClick={drawCard} className="bg-blue-500 text-white">
          Starta Spel
        </Button>
      )}
      
      <div className="space-x-4">
        <Button onClick={() => {
          setRemainingCards([...periodicTableData]);
          setIncorrectCards([]);
          drawCard();
        }} variant="outline">
          Återställ Spel
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Instruktioner</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Spelets Regler</AlertDialogTitle>
              <AlertDialogDescription>
                1. Klicka på kortet för att se dess detaljer
                2. Tryck Rätt om du kunde svaret
                3. Tryck Fel om du inte kunde svaret
                4. Fel besvarade kort kommer att visas igen
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Förstått!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-4">
        <p>Återstående kort: {remainingCards.length}</p>
        <p>Felaktiga kort: {incorrectCards.length}</p>
      </div>
    </div>
  );
};

export default PeriodicTableFlashcards;
