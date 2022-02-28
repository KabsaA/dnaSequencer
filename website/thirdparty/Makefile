all: comparesequences complementstrand dnatomrna dnatoprotein mrnatodna

comparesequences: comparesequences.cpp
	g++ -Wall comparesequences.cpp -o comparesequences

complementstrand: complementstrand.cpp
	g++ -Wall complementstrand.cpp -o complementstrand

dnatomrna: dnatomrna.cpp
	g++ -Wall dnatomrna.cpp -o dnatomrna

dnatoprotein: dnatoprotein.cpp
	g++ -Wall dnatoprotein.cpp -o dnatoprotein

mrnatodna: mrnatodna.cpp
	g++ -Wall mrnatodna.cpp -o mrnatodna
	
clean:
	rm comparesequences
	rm complementstrand
	rm dnatomrna
	rm dnatoprotein
	rm mrnatodna