import { Anion } from "./base";
import { Compound } from "mendeleev";

export default [
  new Anion(
    "hydrate ion",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ O: 1, H: 1 })
  ),

  new Anion(
    "fluoride ion",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ F: 1 })
  ),

  new Anion(
    "cloride",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ Cl: 1 })
  ),

  new Anion(
    "brimide",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ Br: 1 })
  ),

  new Anion(
    "iodide",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ I: 1 })
  ),

  new Anion(
    "sulfide",
    {
      number: 2,
      sign: "-"
    },
    new Compound({ S: 1 })
  ),

  new Anion(
    "nitrate",
    {
      number: 1,
      sign: "-"
    },
    new Compound({ N: 1, O: 3 })
  ),

  new Anion(
    "carbonate",
    {
      number: 2,
      sign: "-"
    },
    new Compound({ C: 1, O: 3 })
  ),

  new Anion(
    "silicate",
    {
      number: 2,
      sign: "-"
    },
    new Compound({ Si: 1, O: 3 })
  ),

  new Anion(
    "sulfate",
    {
      number: 2,
      sign: "-"
    },
    new Compound({ S: 1, O: 4 })
  ),

  new Anion(
    "phosphate",
    {
      number: 3,
      sign: "-"
    },
    new Compound({ P: 1, O: 4 })
  )
];
