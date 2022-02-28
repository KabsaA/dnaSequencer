#include <iostream>
#include <string>
#include <vector>
// #include <sstream>
using namespace std;

string convertAminoAcids(string bases) {
  string tmp = "", protein = "";
  for (int i = 0; i < bases.size()/3; i++) {
    int j = i*3;
    tmp = bases[j];
    tmp += bases[j+1];
    tmp += bases[j+2];
    if (tmp[0] == 'A') { // Done
      if (tmp[1] == 'A') {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "K"; // Lysine
        }else {
          protein += "N"; // Asparagine
        }
      } else if (tmp[1] == 'C') {
        protein += "T"; // Threonine
      } else if (tmp[1] == 'G') {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "R"; // Arginine
        } else {
          protein += "S"; // Serine
        }
      } else {
        if (tmp[2] == 'G') {
          protein += "~START~"; // Methionine
        } else {
          protein += "I"; // Isoleucine
        }
      }
    } else if (tmp[0] == 'C') { // Done
      if (tmp[1] == 'A') {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "Q"; // Glutamine
        } else {
          protein += "H"; // Histidine
        }
      } else if (tmp[1] == 'C') {
        protein += "P"; // Proline
      } else if (tmp[1] == 'G') {
        protein += "R"; // Arginine
      } else {
        protein += "L"; // Leucine
      }
    } else if (tmp[0] == 'G') { // Done
      if (tmp[1] == 'A') {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "E"; // Glutamic Acid
        } else {
          protein += "D"; // Aspartic Acid
        }
      } else if (tmp[1] == 'C') {
        protein += "A"; // Alanine
      } else if (tmp[1] == 'G') {
        protein += "G"; // Glycine
      } else {
        protein += "V"; // Valine
      }
    } else { // Done
      if (tmp[1] == 'A') {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "~STOP~"; // Stop Codon
        } else {
          protein += "Y"; // Tyrosine
        }
      } else if (tmp[1] == 'C') {
        protein += "S"; // Serine
      } else if (tmp[1] == 'G') {
        if (tmp[2] == 'G') {
          protein += "W"; // Tryptophan
        } else if (tmp[2] == 'A') {
          protein += "~STOP~"; // Stop Codon
        } else {
          protein += "C"; // Cysteine
        }
      } else {
        if (tmp[2] == 'A' || tmp[2] == 'G') {
          protein += "L"; // Leucine
        } else {
          protein += "F"; // Phenylaline
        }
      }
    }
  }
  return protein;
}

int main(int argc, const char *argv[]) {
  if (argc != 2) { // Checking to make sure the number of arguments is valid
   cout << "Usage: <call> <sequence>" << endl;
   return 0;
 }
 string dna = argv[1];
 string protein = convertAminoAcids(dna);
 cout << protein << endl;
 return 0;

}
