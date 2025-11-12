import React from 'react'
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

const SessionSkeleton = () => {
  return (
   
    <Card className="max-w-sm col-span-3">
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  )
}

export default SessionSkeleton