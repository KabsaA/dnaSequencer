#include <iostream>
#include <string>
#include <vector>
// #include <sstream>
using namespace std;

string convertdna(string bases) {
    string dna = "";
    for (int i = 0; i < bases.size(); i++) {
        if (bases[i] == 'U') {
            dna += 'T';
        }
        else {
            dna += bases[i];
        }
    }
    return dna;
}

int main(int argc, const char *argv[]) {
  if (argc != 2) { // Checking to make sure the number of arguments is valid
   cout << "Usage: <call> <sequence>" << endl;
   return 0;
 }
 string rna = argv[1];
 string dna = convertdna(rna);
 cout << dna << endl;
 return 0;

}