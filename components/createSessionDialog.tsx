"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { Calendar } from "./calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { combineDateAndTime } from "@/lib/utils"
import { AddNewSessionToDb } from "@/data/supabase"
import { Spinner } from "./ui/spinner"

export function CreateSessionDialog() {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Hooks for tracking session input
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState<string>("10:30:00")
  const [endTime, setEndTime] = useState<string>("12:30:00")

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    if (!date) {
      // handle missing date (show error UI, toast, etc.). For now just return.
      console.error("No date selected")
      return
    }

    const startsAt = combineDateAndTime(date, startTime)
    const endsAt = combineDateAndTime(date, endTime)

    // Convert to ISO to send to Supabase (timestamptz)
    const session = {
      title,
      description,
      location,
      subject,
      starts_at: startsAt.toISOString(),
      ends_at: endsAt.toISOString(),
    }

    try {
      // Create the session in supabase
      const { data, error } = await AddNewSessionToDb(session)

      if (!error) {
        // TODO: Make a toast if succesful

        // Close dialog if succesful
        setDialogOpen(false)
      } else {
        console.log("Error creating session", error.message)
      }
    } catch (error) {
      console.log("Error creating session", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreateSession}>
          <DialogHeader>
            <DialogTitle>Create session</DialogTitle>
            <DialogDescription>
              Choose the different options for creating a session that the
              students can see
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Session title</Label>
              <Input
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
              />
            </div>
            <div className="grid gap-3">
              <Label>Subject</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {subject ? subject : "Select subject"}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setSubject("Programming")}>
                    Programming
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSubject("User testing")}>
                    User testing
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSubject("UX design")}>
                    UX design
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Subject">Location</Label>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                id="Location"
                name="Location"
              />
            </div>
            {/* Date picker */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                    sideOffset={12}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  Start time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  onChange={(e) => setStartTime(e.target.value)}
                  defaultValue={startTime}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                  End time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  onChange={(e) => setEndTime(e.target.value)}
                  defaultValue={endTime}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {isLoading ? (
              <Button>
                <Spinner />
                Creating...
              </Button>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
