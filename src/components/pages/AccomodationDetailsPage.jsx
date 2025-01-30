import { useParams } from 'react-router-dom'

export default function AccomodationDetailsPage() {
    const params = useParams()
    return <>
        accomoodation page {params.id}
    </>
}