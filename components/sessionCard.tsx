import { Card, CardContent, CardTitle } from "./ui/card"
import { sessionProps } from "@/lib/types"

const SessionCard = ({ id, title, subject, starts_at, ends_at, location, teacherId, ...props }: sessionProps) => {
  return (
    <Card {...props} className="max-w-sm col-span-3">
      <CardContent className="space-y-2">
        <CardTitle className="text-primary text-lg">{subject}</CardTitle>
        <h2 className="font-semibold">{title}</h2>
        <span className="font-semibold">Mødetid:</span>

        <h2 className="font-light">
          {new Date(starts_at).toLocaleTimeString("dk-DK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}{" "}
          -{" "}
          {new Date(ends_at).toLocaleTimeString("dk-DK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </h2>

        <h2 className="font-light">{location}</h2>
      </CardContent>
    </Card>
  )
}

export default SessionCard
