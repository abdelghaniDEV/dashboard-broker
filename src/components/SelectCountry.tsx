"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import Image from "next/image";

type country = {
  name: string;
  code: string;
  flag: string; //
  phoneCode: string;
};

interface CountryData {
  name: {
    common: string;
  };
  cca2: string;
  flags: {
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
}

type CountrySelectProps = {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectCountry({ setCountry }: CountrySelectProps) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryList = response.data.map((country: CountryData) => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg,
          phoneCode: country.idd?.root
            ? `${country.idd.root}${
                country.idd.suffixes ? country.idd.suffixes[0] : ""
              }`
            : "N/A",
        }));
        console.log(response.data);
        setCountries(
          countryList.sort((a: country, b: country) =>
            a.name.localeCompare(b.name)
          )
        );
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="flex flex-col gap-2 relative">
      <Label>Country</Label>
      <Select
        onValueChange={(value) =>
          setCountry(value)
        }
      >
        <SelectTrigger className={`w-full border-[1px] `} >
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country: country) => {
            return (
              <SelectItem key={country.code} value={country.name}>
                <div className="flex items-center gap-2">
                  <Image
                    className="w-6 h-5 "
                    width={24}
                    height={20}
                    src={country.flag}
                    alt={country.name}
                  />
                  <div>
                    {country.name}
                  </div>
                </div>
              </SelectItem>
            );
          })}
          
        </SelectContent>
      </Select>
      {/* {error && <p className="text-red-500 text-[12px] absolute bottom-[-18px]">{error}</p>} */}
    </div>
  );
}
