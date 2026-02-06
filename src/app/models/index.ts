export type Program =
{
    ID: number,
    naziv:string,
    opis:string
}
export  type  Godina = {
    ID:number,
    naziv:string,
    program:number
}

export type Tema={
    ID:number,
    naziv:string,
    Opis:string,
    Godina:number
}

export type Pitanje = {
    ID: number,
    Pitanje:string,
    opisno: boolean,
    izbor: boolean,
    Odgovor: string,
    Tema:number
}

export type Odgovor = {
    ID: number,
    Odgovor: string,
    tacan: Buffer,
    pitanje: number
}

export type PitanjeFront = {
    ID: number,
    Pitanje:string,
    opisno: Buffer,
    izbor: Buffer,
    Odgovor: string,
    Odgovori: Array<Odgovor>
}
export type IspitModel = {
    tema: number,
    nPitanja: number
}
export type testOdgovor = {
    odgovorID: number,
    Odgovor: string,
    Tacan: boolean
}
export type testPitanje = {
    TestPitanjeID: number,
    Pitanje: string,
    PitanjeID: number,
    Izbor: boolean,
    Opisno: boolean,
    Odgovori: Array<testOdgovor>
}
export type testIspit = {
    Pitanja: Array<testPitanje>,
    Ispit: number,
    Date: Date,
    Ispitanik: string
}
export type testOdgovorSubmited = {
    pitanjeID: number,
    odgovor: {
        odgovori: [],
        opisno: string
    }
}

export type testListElem = {
    korisnik: string,
    ime: string,
    ispit: number,
}

export type testResultOdgovori = {
    odgovori: Array<any>,
    kljuc: Array<testOdgovor>,
    odgovor: string,
    odgovorKljuc: string,
    rezultat: number
}

export type testResultPitanja = {
    TestPitanjeID: number,
    Pitanje: string,
    PitanjeID: number,
    Izbor: boolean,
    Opisno: boolean,
    ProfilOdgovorID: number,
    Odgovori: testResultOdgovori
}

export type testResult = {
    rezultat: number,
    pitanja: Array<testResultPitanja>,
    ispit: number,
    korisnik: string
}

export type testPitanjePoeni= {
    pitanjeID: number,
    poeni: number
}

export type studentTest = {
    ID: number,
    Datum: Date,
    Program:string,
    Godina:string,
    Korisnik:string,
}

export type studentTestRezultati = {
    ID: number,
    Pitanje:number,
    Rezultat:number,
}


