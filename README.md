# uniquepasswordgenerator

This app is to generate unique six character passwords, six random numbers are generated remotely, 
  each number creates a character.

This project basically generates a secured hash like passphrase for replacing general passwords such as network access codes, 
file lock codes, etc and allows user to generate a secure pass phrase which can have as many as 6 characters in a word and 
generate a passphrase combining upto 6 of those words.

Additionally the user can generate upto 20 sets of above mentioned passphrases in one go.

On the backend it fetches an integer over the api from a secure server, iterates it for the whole length and
 matches the formed number with a word from a pass phrase generating data.
Makes use of Node/Express/Redis/Api calling/Async programming
