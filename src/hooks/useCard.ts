import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Card from "@/core/Card";

interface ICard {
    figures: string[]
}

export default function useCard({figures}: ICard) {
    const [figuresShuffle, setFiguresShuffle] = useState<string[]>([])
    const [figuresNotMatch, setFiguresNotMatch] = useState<string[]>(figures)
    const [cardsSelected, setCardsSelected] = useState<Card[]>([])
    const [index, setIndex] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        shuffleArray()
    }, [])

    useEffect(() => {
        if(cardsSelected.length === 2 && cardsSelected[0].image === cardsSelected[1].image){
            setFiguresNotMatch([...figuresNotMatch.filter((figure: string) => figure !== cardsSelected[0].image)])
            setCardsSelected([])
            setIndex([])
        }

        else if(cardsSelected.length === 2){
            setTimeout(() => {
                setCardsSelected([])
                setIndex([])
            }, 700)
        }

        if(figuresNotMatch.length === 0){
            setTimeout(() => {
                router.push("/GameOver")
            }, 950)
        }
    }, [cardsSelected, figuresNotMatch, index, router])


    function shuffleArray(){
        const shuffle = (listFigure: string[]) => listFigure.sort(() => Math.random() - 0.5);
        setFiguresShuffle(shuffle([...figures, ...figures]))
    }

    return {
        figuresShuffle,
    }
}
