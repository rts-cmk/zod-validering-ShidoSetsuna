# Zod‑validering

I denne opgave skal du opsætte en moderne React‑applikation med Vite og implementere formvalidering ved hjælp af Zod. Du skal bygge en registreringsformular, hvor brugerens input valideres både i UI’et og i JavaScript‑logikken.

---

## 1. Projektopsætning

- Opret et nyt projekt med **Vite** og **React**
- Installer **Zod**
- Opret en komponent `RegistrationForm.jsx` hvor al formular‑ og valideringslogik ligger

---

## 2. Formularfelter

Din formular skal som minimum indeholde følgende felter:

- Fornavn (tekst)
- Efternavn (tekst)
- Email (skal være gyldig email)
- Password (se krav nedenfor)
- Gentag password (skal matche password)
- Fødselsdato (bruges til alderscheck)
- Telefonnummer (valgfrit, men skal valideres hvis udfyldt)

Du må gerne tilføje flere felter.

---

## 3. Valideringskrav (Zod)

### Password‑krav

Password skal:

- være mindst 8 tegn
- indeholde mindst ét stort bogstav
- indeholde mindst ét lille bogstav
- indeholde mindst ét tal
- indeholde mindst ét specialtegn (!@#$%^&\*)

`Gentag password` skal matche det første password.

---

### Alderskrav

Brugeren skal være **mindst 18 år**.

Du skal:

- Validere datoen med Zod
- Udregne alder ud fra fødselsdatoen
- Returnere en fejl, hvis brugeren er under 18

---

### Email

- Skal være en gyldig emailadresse (`z.string().email()`)

---

### Telefonnummer

- Feltet er valgfrit
- Hvis det er udfyldt, skal det matche et dansk nummerformat (8 cifre)

---

### Andre krav (vælg mindst 2)

Vælg mindst to af følgende ekstra valideringer:

- Brugernavn: kun bogstaver, tal og underscore
- Adresse: minimum 5 tegn
- Postnummer: præcis 4 cifre
- Land: skal være et af en liste (fx Danmark, Sverige, Norge)
- Nyhedsbrev: kræver email, hvis checkbox er slået til
- Profilbeskrivelse: max 200 tegn

---

## 4. Fejlhåndtering i UI

- Fejlbeskeder skal vises under hvert felt
- Fejl skal opdateres live, når brugeren skriver
- Når formularen er gyldig, skal du vise en “Tak for din registrering”-besked med de indtastede data (undtagen password)

---

## 5. Bonus (frivilligt)

Hvis du vil udfordre dig selv, kan du tilføje:

- Debounce på validering
- Et progress‑bar der viser password‑styrke
- Zod‑refinement til komplekse regler
- Async validering (fx tjek om brugernavn er “optaget”)
  - Hvilke valideringer du har implementeret
  - Eventuelle ekstra features
