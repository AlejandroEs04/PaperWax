export type PaperType = {
    id?: number 
    name: string
}

export type PaperCreate = Omit<PaperType, 'id'>

class Paper {
    public id?: number 
    public name: string

    constructor(item?: Partial<PaperType>) {
        this.id = item?.id
        this.name = item?.name
    }
}

export default Paper 