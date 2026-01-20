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
