"use client";

import { Select } from "@/src/components/ui/select";
import { DatePicker } from "@/src/components/ui/datePicker";
import { useEffect, useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [workingDays, setWorkingDays] = useState<number>(0);

  const personnes = [
    { value: "1", label: "FOURRIER Celine" },
    { value: "2", label: "GREPILLOUX Juliette" },
  ];

  const typeLeave = [
    { value: "CONGES PAYES", label: "CONGES PAYES" },
    { value: "ABSENCE MALADIE", label: "ABSENCE MALADIE" },
    { value: "CONGES NON PAYES", label: "CONGES NON PAYES" },
    { value: "CONGES SPECIAUX", label: "CONGES SPECIAUX" },
  ];

  // Liste des jours fériés en France pour 2025 (à compléter selon vos besoins)
  const holidays2025 = [
    "2025-01-01", // Jour de l'an
    "2025-04-21", // Lundi de Pâques
    "2025-05-01", // Fête du Travail
    "2025-05-08", // Victoire 1945
    "2025-05-29", // Ascension
    "2025-06-09", // Lundi de Pentecôte
    "2025-07-14", // Fête Nationale
    "2025-08-15", // Assomption
    "2025-11-01", // Toussaint
    "2025-11-11", // Armistice
    "2025-12-25", // Noël
  ];

  // Fonction pour vérifier si une date est un jour férié
  const isHoliday = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    return holidays2025.includes(dateString);
  };

  // Fonction pour vérifier si une date est un dimanche
  const isSunday = (date: Date): boolean => {
    return date.getDay() === 0; // 0 = dimanche en JavaScript
  };

  // Calcul du nombre de jours ouvrables
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Vérifier que la date de fin n'est pas antérieure à la date de début
      if (end < start) {
        setWorkingDays(0);
        return;
      }

      let count = 0;
      const current = new Date(start);

      // Parcourir chaque jour entre les deux dates
      while (current <= end) {
        // Ajouter au compteur si ce n'est ni un dimanche ni un jour férié
        if (!isSunday(current) && !isHoliday(current)) {
          count++;
        }
        // Passer au jour suivant
        current.setDate(current.getDate() + 1);
      }

      setWorkingDays(count);
    } else {
      setWorkingDays(0);
    }
  }, [startDate, endDate, isHoliday]);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  return (
    <div>
      <h1>Creastyl</h1>
      <Select options={personnes} />
      <br />
      <Select options={typeLeave} />
      <br />
      <DatePicker label="Date de début" onChange={handleStartDateChange} />
      <br />
      <DatePicker label="Date de fin" onChange={handleEndDateChange} />
      <br />
      {workingDays > 0 && (
        <div>
          <strong>Nombre de jours ouvrables : {workingDays}</strong>
        </div>
      )}
    </div>
  );
}
