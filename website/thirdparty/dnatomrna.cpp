#include <iostream>
#include <string>
#include <vector>
// #include <sstream>
using namespace std;

string convertmrna(string bases) {
    string rna = "";
    for (int i = 0; i < bases.size(); i++) {
        if (bases[i] == 'T') {
            rna += 'U';
        }
        else {
            rna += bases[i];
        }
    }
    return rna;
}

int main(int argc, const char *argv[]) {
  if (argc != 2) { // Checking to make sure the number of arguments is valid
   cout << "Usage: <call> <sequence>" << endl;
   return 0;
 }
 string dna = argv[1];
 string rna = convertmrna(dna);
 cout << rna << endl;
 return 0;

}