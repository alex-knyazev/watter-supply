class Ion {
  constructor(name, type, charge, compound, concentration) {
    this.name = name;
    this.type = type;
    this.charge = charge;
    this.compound = compound;
    this.concentration = concentration || 0;
    this.molarMass = parseFloat(compound.getMass().toFixed(2));
    this.molarEquivalentMass = this.calculateMolarEquivalentMass();
    this.equivalentMass = this.calculateEquivalentMass();
    this.ionElementsText = compound.elementsList.join('');
    this.lastElementName = compound.elementsList[compound.elementsList.length - 1];
    this.amountOfLastElement = compound.elements[this.lastElementName];
  }

  calculateMolarEquivalentMass() {
    const value = (this.molarMass * 1) / this.charge.number;
    return parseFloat(value.toFixed(2));
  }

  calculateEquivalentMass() {
    const value = parseFloat((this.concentration / this.molarEquivalentMass).toFixed(2));
    return value;
  }

  setConcentration(value) {
    this.concentration = value;
    this.equivalentMass = this.calculateEquivalentMass();
  }

  getCompaundText() {
    return this.compound.elementsList.join('');
  }
}

class Kation extends Ion {
  constructor(name, charge, compound, concentration) {
    super(name, 'kation', charge, compound, concentration);
  }
}

class Anion extends Ion {
  constructor(name, charge, compound, concentration) {
    super(name, 'anion', charge, compound, concentration);
  }
}

export { Kation, Anion };
