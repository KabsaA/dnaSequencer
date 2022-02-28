#include <iostream>
#include <string>
#include <vector>
// #include <sstream>
using namespace std;

string complement(string bases) {
    string minus_strand = "";
    int len = bases.length();
    for (int i=1; i <= len; i++) {
        minus_strand += bases[len-i];
    }
    for (int i=0; i < len; i++) {
        if (minus_strand[i] == 'A') {
            minus_strand[i] = 'T';
        } else if (minus_strand[i] == 'T') {
            minus_strand[i] = 'A';
        } else if (minus_strand[i] == 'G') {
            minus_strand[i] = 'C';
        } else {
            minus_strand[i] = 'G';
        }
    }
    return minus_strand;
}

int main(int argc, const char *argv[]) {
  if (argc != 2) { // Checking to make sure the number of arguments is valid
   cout << "Usage: <call> <sequence>" << endl;
   return 0;
 }
 string plus_strand = argv[1];
 string minus_strand = complement(plus_strand);
 cout << minus_strand << endl;
 return 0;

}