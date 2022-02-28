#include <vector>
#include <queue>
#include <string>
#include <sstream>
#include <iostream>
#include <cmath>
using namespace std;


//Finding the min of two inputs
//Returns which integer is the minimum
int minFind(int x, int y) {
  if (x <= y) {
    return x;
  }
  return y;
}


// Comparing the Sequences using Damerau Levenshtein Edit Distance Algorithm
// Returns the damerau Levenshtein edit distance as a number of operations it takes to go from first sequence to second sequence
int compareSequences(string first, string second) {

  int lengthFirst = first.length(); //Length of first string
  int lengthSecond = second.length(); //Length of second string
  int T[lengthFirst + 1][lengthSecond + 1]; //Let T be a (1 + len(first)) x (1 + len(second)) array
  int M = 0;

  for (int i = 0; i < lengthFirst + 1; i++) {
    for (int j = 0; j < lengthSecond + 1; j++) {
      M = i + j;
      if (i > 0) {
        M = minFind(M, 1 + T[i - 1][j]); //min(M, 1+T[i-1,j])
      }
      if (j > 0) {
        M = minFind(M, 1 + T[i][j - 1]); //min(M, 1+T[i,j-1])
      }
      if (i > 0 && j > 0) {
        if (first[i-1] == second[j-1]) {
          M = minFind(M, T[i - 1][j - 1]); //min(M, T[i-1,j-1])
        } else if (first[i - 1] != second[j - 1]) {
          M = minFind(M, 1 + T[i - 1][j - 1]); //min(M, 1+T[i-1,j-1])
        }
      }
      if (i > 1 && j > 1) {
        if (first[i - 1] == second[j - 2] && first[i - 2] == second[j - 1]) {
          M = minFind(M, 1 + T[i - 2][j - 2]); //min(M, 1+T[i-2,j-2])
        }
      }
      T[i][j] = M;
    }

    // Printing the array T
    // for (int i = 0; i < lengthFirst + 1; i++) {
    //   for (int j = 0; j < lengthSecond + 1; j++) {
    //     cout << "T[" << i << "][" << j << "]=" << T[i][j] << " ";
    //   }
    //   cout << "\n";
    // }
  }
  //Making three arrays of characters that show the differences in the two sequences and a consensus sequence between the two
  vector<char> topSequence; //Sequence of the first
  vector<char> consensusSequence; //Consensus sequence
  vector<char> bottomSequence; //Sequence of the second

  int i = lengthFirst;
  int j = lengthSecond;

  while (i > 0 || j > 0) {
    if (T[i][j] > T[i-1][j]) { //Insertion in first at position i and deletion in second sequence at position j
      topSequence.insert(topSequence.begin(), first[i-1]);
      consensusSequence.insert(consensusSequence.begin(), '-');
      bottomSequence.insert(bottomSequence.begin(), '-');
      i--;
    } else if (T[i][j] > T[i][j-1]) { //Deletion in the first sequence at position i and insertion in second sequence at position j
      topSequence.insert(topSequence.begin(), '-');
      consensusSequence.insert(consensusSequence.begin(), '-');
      bottomSequence.insert(bottomSequence.begin(), second[j-1]);
      j--;
    } else if (T[i][j] > T[i-1][j-1]) { //Substitution at position i in first and position j in second
      topSequence.insert(topSequence.begin(), first[i-1]);
      consensusSequence.insert(consensusSequence.begin(), ' ');
      bottomSequence.insert(bottomSequence.begin(), second[j-1]);
      i--;
      j--;
    } else if (T[i][j] == T[i-1][j-1]) { //Transposition and the character being the same
      if (first[i-1] == second[j-1]) { //Characters are the same
        topSequence.insert(topSequence.begin(), first[i-1]);
        consensusSequence.insert(consensusSequence.begin(), first[i-1]);
        bottomSequence.insert(bottomSequence.begin(), second[j-1]);
        i--;
        j--;
      } else {
        topSequence.insert(topSequence.begin(), first[i-1]);
        topSequence.insert(topSequence.begin(), first[i-2]);
        consensusSequence.insert(consensusSequence.begin(), '*');
        consensusSequence.insert(consensusSequence.begin(), '*');
        bottomSequence.insert(bottomSequence.begin(), second[j-1]);
        bottomSequence.insert(bottomSequence.begin(), second[j-2]);
        i = i - 2;
        j = j - 2;
      }
    }
  }

  int lengthConsensus = consensusSequence.size();
  int counter = 0;

  while (counter < lengthConsensus) {
    if ((lengthConsensus - counter) > 24) {
      for (int k = 0; k < 25; k++) {
        cout << topSequence.at(k + counter);
      }
      cout << endl;
      for (int l = 0; l < 25; l++) {
        cout << consensusSequence.at(l + counter);
      }
      cout << endl;
      for (int m = 0; m < 25; m++) {
        cout << bottomSequence.at(m + counter);
      }
      cout << endl;
      counter = counter + 25;
    } else {
      int n = lengthConsensus - counter;
      for (int k = 0; k < n; k++) {
        cout << topSequence.at(k + counter);
      }
      cout << endl;
      for (int l = 0; l < n; l++) {
        cout << consensusSequence.at(l + counter);
      }
      cout << endl;
      for (int m = 0; m < n; m++) {
        cout << bottomSequence.at(m + counter);
      }
      cout << endl;
      counter = counter + n;
    }
  }

  //When the letters are the same lets just use the letters in all three vectors
  //When there is a deletion or insertion then we can just use dashes
  //When there is a substitution or transposition then we can just use a space to show that the two sequences are not similar
  //Alternatively, when there is a transposition we can use x's(?) or possibly *'s(?)

  //On the same character the values on all sides are the same or higher
  //On an Insertion into y it is a lower number at the poistion that is j-1.  This is the same thing as a deletion in x
  //On a Deletion into y it is a lower number at the position that is i-1.  This is the same thing as an insertion in x
  //On a Substitution is is a lower number at the position that is i-1 and j-1 but have to make sure it isn't the middle of a transposition
  //On a Transposition it looks exactly like the same letter but you have to check that x_i != y_j

  //Can use a bool value to keep track of when a transposition is occuring and reset it at the end of the next loop.
  //Probably use a while loop and not a for loop
  //Should probably check for insertions and deletions first because they are easy
  //Next can check for a substitution and make sure that we aren't in the transposition case but that's what the bool can be used for.  (alternatively, we could also compare x_i-1 and y_j as well as x_i and y_j-1)
  //Next can check for transposition by checking if x_i and y_j are equal, if not then it's a Transposition
  //If x_i and y_j are equal then there is no operation done and nothing needs be done.



  return T[lengthFirst][lengthSecond];
}


int main(int argc, const char *argv[]) {
  if (argc != 3) { // Checking to make sure the number of arguments is valid
   cout << "Usage: <call> <sequence> <sequence>" << endl;
   return 0;
 }
 string query = argv[1];
 string archivesequence = argv[2];

 compareSequences(query, archivesequence);

 return 0;

}