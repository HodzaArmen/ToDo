# ToDo List Application

ToDo List je preprosta spletna aplikacija za upravljanje nalog. Omogoča dodajanje, urejanje, označevanje kot opravljeno, brisanje in trajno brisanje nalog. Prav tako omogoča ogled izbrisanih nalog.

## Funkcionalnosti

- Dodajanje novih nalog
- Urejanje obstoječih nalog
- Označevanje nalog kot opravljenih/neopravljenih
- Brisanje nalog (označi kot izbrisano)
- Prikaz izbrisanih nalog
- Trajno brisanje nalog iz baze podatkov

## Uporabljene tehnologije

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Baza podatkov**: SQLite
- **Opozorila**: SweetAlert2

## Namestitev in zagon

1. **Klonirajte repozitorij**:
    ```sh
    git clone https://github.com/HodzaArmen/ToDo
    cd ToDo
    ```

2. **Namestite odvisnosti**:
    Prepričajte se, da imate nameščen Node.js in npm.
    ```sh
    npm install
    ```

3. **Zaženite strežnik**:
    ```sh
    node server.js
    ```

4. **Odprite aplikacijo v brskalniku**:
    Obiščite `http://localhost:3000` v vašem brskalniku.

## Struktura projekta

- [index.html](https://github.com/HodzaArmen/ToDo/blob/main/index.html): Glavna HTML datoteka, ki vsebuje strukturo aplikacije.
- [style.css](https://github.com/HodzaArmen/ToDo/blob/main/style.css): CSS datoteka za oblikovanje aplikacije.
- [server.js](https://github.com/HodzaArmen/ToDo/blob/main/server.js): Strežniška datoteka, ki vsebuje API za upravljanje nalog.
- [tasks.db](https://github.com/HodzaArmen/ToDo/blob/main/tasks.db): SQLite baza podatkov, ki shranjuje naloge.

## API poti

- `GET /tasks`: Pridobi vse naloge, ki niso izbrisane.
- `GET /tasks/deleted`: Pridobi vse izbrisane naloge.
- `POST /tasks`: Dodaj novo nalogo.
- `PUT /tasks/:id`: Posodobi besedilo naloge ali označi kot opravljeno/neopravljeno.
- `DELETE /tasks/:id`: Označi nalogo kot izbrisano.
- `DELETE /tasks/forever/:id`: Trajno izbriši nalogo iz baze podatkov.

## Avtor

- Armen Hodža