"use client"

import { ApplicationForm } from "@/components/application-form"
import type { LoanApplicationData } from "@/components/application-form"
import { submitApplication } from "@/app/actions/submit-application"

export function ApplicationFormWrapper() {
  const handleSubmit = async (data: LoanApplicationData) => {
    const result = await submitApplication(data)

    if (!result.success) {
      throw new Error(result.message)
    }

    return
  }

  return <ApplicationForm onSubmit={handleSubmit} />
}
