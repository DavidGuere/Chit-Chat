function generatePinAsString(): string {
  var numberToString: string = "";

  for (let i = 0; i < 8; i++) {
    let randNumber: number = Math.floor(Math.random() * 10);
    numberToString = numberToString + randNumber.toString();
  }

  return numberToString;
}

export default generatePinAsString;
