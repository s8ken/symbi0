"use client"

import { useState, useEffect } from "react"
import { allHaikus } from "../data/haikus"
import { getDailyHaikus } from "../utils/seededRandom"
import Haiku from "../components/haiku"

export default function Becoming() {
  const [haikus, setHaikus] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const dailyHaikus = getDailyHaikus(allHaikus, date)
    setHaikus(dailyHaikus.haikus)
  }, [date])

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        {haikus.map((haiku, index) => (
          <Haiku haiku={haiku} key={haiku.id} index={index} />
        ))}
      </div>
    </div>
  )
}
