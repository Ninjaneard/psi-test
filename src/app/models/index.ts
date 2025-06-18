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
    tacan: boolean,
    pitanje: number
}

export type PitanjeFront = {
    ID: number,
    Pitanje:string,
    opisno: boolean,
    izbor: boolean,
    Odgovor: string,
    Odgovori: Array<Odgovor>
}
