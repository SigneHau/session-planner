'use client'

import { use } from "react"

// NOT PUBLIC ROUTE, ONLY AUTHORISED USERS CAN SEE THIS PROFILE PAGE

const TeacherProfile = ({ params }: { params: Promise<{ id: string }> }) => {

    // TODO: Check if there is a logged in user and they are authorised -> else redirect to signin/signup

    // Get the id and read the promise with the use hook on the client (renamed to teacherId) 
    const { id: teacherId } = use(params)

    // TODO: Call the server here and get the teacher info here or maybe get the teacher as a prop from parent
  
  
    return <div>Profile: You are teacher: {teacherId}</div>
}

export default TeacherProfile
