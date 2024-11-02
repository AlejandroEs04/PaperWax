import { Paper } from "@/types"

export default function getPapersPicker (data: Paper[]) {
    const papers = data.map((paper: Paper) => {
        return {
            label: paper.name, 
            value: paper.id
        }
    })

    return papers
}