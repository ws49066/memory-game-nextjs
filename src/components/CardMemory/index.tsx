import Image from "next/image"
import { CardFront, CardBack, Card } from "./styles"
import { useState } from "react"

export interface ICardMemory {
    index: string
    imageName: string,
    handleClickCard: (selected: (value: boolean) => void, imageName: string, index: string) => void
    matchedBy?: 'player1' | 'player2' | null
}


export default function CardMemory(props: ICardMemory) {
    const [selected, setSelectdown] = useState(false)
    const [imageName] = useState<string>(props.imageName)
    const [index] = useState<string>(props.index)


    return (

        <Card onClick={() => {
            if (!props.matchedBy) {
                props.handleClickCard(setSelectdown, imageName, index)
            }
        }} selected={selected} matchedBy={props.matchedBy}>
            <CardBack>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/Image=${imageName}.svg`}
                    alt={imageName}
                    width={80}
                    height={80}
                    priority
                />
            </CardBack>
            <CardFront />
        </Card>
    )
}
