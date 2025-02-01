import { useParams } from 'react-router-dom'

export default function AccommodationDetailsPage() {
    const params = useParams()
    return <>
        accomoodation page {params.id}
    </>
}