// #include <iostream>
// #include <string>
// #include <vector>

function convertAminoAcids(bases) {
    var tmp = "", protein = "";
    for (var i = 0; i < bases.length/3; i++) {
      var j = i*3;
      tmp = bases[j];
      tmp += bases[j+1];
      tmp += bases[j+2];
      if (tmp[0] === 'A') { // Done
        if (tmp[1] === 'A') {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "K"; // Lysine
          }else {
            protein += "N"; // Asparagine
          }
        } else if (tmp[1] === 'C') {
          protein += "T"; // Threonine
        } else if (tmp[1] === 'G') {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "R"; // Arginine
          } else {
            protein += "S"; // Serine
          }
        } else {
          if (tmp[2] === 'G') {
            protein += "~START~"; // Methionine
          } else {
            protein += "I"; // Isoleucine
          }
        }
      } else if (tmp[0] === 'C') { // Done
        if (tmp[1] === 'A') {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "Q"; // Glutamine
          } else {
            protein += "H"; // Histidine
          }
        } else if (tmp[1] === 'C') {
          protein += "P"; // Proline
        } else if (tmp[1] === 'G') {
          protein += "R"; // Arginine
        } else {
          protein += "L"; // Leucine
        }
      } else if (tmp[0] === 'G') { // Done
        if (tmp[1] === 'A') {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "E"; // Glutamic Acid
          } else {
            protein += "D"; // Aspartic Acid
          }
        } else if (tmp[1] === 'C') {
          protein += "A"; // Alanine
        } else if (tmp[1] === 'G') {
          protein += "G"; // Glycine
        } else {
          protein += "V"; // Valine
        }
      } else { // Done
        if (tmp[1] === 'A') {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "~STOP~"; // Stop Codon
          } else {
            protein += "Y"; // Tyrosine
          }
        } else if (tmp[1] === 'C') {
          protein += "S"; // Serine
        } else if (tmp[1] === 'G') {
          if (tmp[2] === 'G') {
            protein += "W"; // Tryptophan
          } else if (tmp[2] === 'A') {
            protein += "~STOP~"; // Stop Codon
          } else {
            protein += "C"; // Cysteine
          }
        } else {
          if (tmp[2] === 'A' || tmp[2] === 'G') {
            protein += "L"; // Leucine
          } else {
            protein += "F"; // Phenylaline
          }
        }
      }
    }
    return protein;
  };
  export default convertAminoAcids;
  // function main(argc) {
  //   if (argc != 2) { // Checking to make sure the number of arguments is valid
  //    console.log('Usage: <call> <sequence></sequence>');
  //    return 0;
  //  }
  //  var dna = argc;
  //  var protein = convertAminoAcids(dna);
  //  console.log(protein);
  //  return;
  
  // }
  