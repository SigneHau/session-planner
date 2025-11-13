import { Card, CardContent, CardTitle } from "./ui/card"
import { sessionProps } from "@/lib/types"

const SessionCard = ({ title, subject, starts_at, ends_at, location }: sessionProps) => {
  return (
    <Card className="max-w-sm w-full">
      <CardContent className="space-y-2">
       
        <CardTitle className="text-primary text-xl">{subject}</CardTitle>

      
        <p className="font-semibold">{title}</p>

      
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Dato:</span>
          <span className="font-light">
            {new Date(starts_at).toLocaleDateString("dk-DK", { hour12: false })}
          </span>
        </div>

        
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Mødetid:</span>
          <span className="font-light">
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
          </span>
        </div>

      
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Lokation:</span>
          <span className="font-light">{location}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default SessionCard
