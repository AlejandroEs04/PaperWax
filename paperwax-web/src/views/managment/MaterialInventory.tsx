import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getMaterials } from '../../api/MaterialApi'

export default function MaterialInventory() {
    const { data, isLoading } = useQuery({
        queryKey: ['raw-materials'], 
        queryFn: getMaterials
    })

    if(isLoading) return 'Cargando...'

    if(data) return (
        <div>MaterialInventory</div>
    )
}
