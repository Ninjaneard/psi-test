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
