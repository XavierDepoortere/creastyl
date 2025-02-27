"use client";

import { ChangeEvent } from "react";

interface DatePickerProps {
  label: string;
  onChange: (date: string) => void;
}

export function DatePicker({ label, onChange }: DatePickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="date-picker">
      <label>{label}</label>
      <input type="date" onChange={handleChange} />
    </div>
  );
}
