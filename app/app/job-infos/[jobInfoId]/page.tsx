import Link from "next/link"
import { BackLink } from "../../../../components/BackLink"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRightIcon, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import formatExperienceLevel from "@/features/jobinfos/lib/formatExperienceLevel"
import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
import { cacheTag } from "next/cache"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { notFound } from "next/navigation"
import { SuspendedItem } from "@/components/SuspendedItem"
import Skeleton from "@/components/Skeleton"


const JobInfoPage = async ({ params, }: {params : Promise<{jobInfoId : string}>}) => {
  const { jobInfoId } = await params
  // const {userId , redirectToSignIn} = await getCurrentUser()
  // if(userId== null) return redirectToSignIn()

  // const jobInfo= await getJobInfo(jobInfoId ,userId)
  const jobInfo  = getCurrentUser().then(
    async({userId , redirectToSignIn}) =>{
      if(userId == null) return redirectToSignIn()

        const jobInfo = await getJobInfo(jobInfoId , userId)
        if(jobInfo == null) return notFound();

        return jobInfo
    }
  )
  const options = [
    {
      label: "Answer Technical Questions",
      description: "Challenge Yourself with Practice Questions tailored to your job description.",
      href: "questions",
    },
    {
      label: "Practice Interviews",
      description: "Simulate a real interview with AI-powered mock inteviews",
      href: "interviews",
    },
    {
      label: "Refine Your Resume",
      description: "Get Expert Feedback on your resume and improve your chances of getting shortlisted",
      href: "resumes",
    },
    {
      label: "Update Job Description",
      description: "This should only be used for minor updates",
      href: "edit",
    },
  ]
  if (jobInfo== null) {
    return (
      <div className="container my-4">
        <BackLink href="/app">Dashboard</BackLink>
        <p className="text-muted-foreground">Job info not found</p>
      </div>
    )
  }
  return (
    <div className="container my-4 space-y-4">
      <BackLink href="/app">Dashboard</BackLink>

      <div className="space-y-6 ">
        <div className="flex justify-between ">

        <header className="space-y-4">
     
          <h1 className="text-3xl md:text-4xl">
        <SuspendedItem
        item={jobInfo}
        fallback={
          <Skeleton className="w-48"/>
        }
        result={j=>j.name}
        />

          </h1>
        
          <div className="flex gap-2">
          <SuspendedItem
        item={jobInfo}
        fallback={
          <Skeleton className="w-32"/>
        }
        result={j=>  <Badge variant="secondary">
          {formatExperienceLevel(j.experienceLevel)}
        </Badge>}
        />
          
          <SuspendedItem
          item={jobInfo}
          fallback={null}
          result={j => <Badge variant="secondary">{j.title}</Badge>}
          />

        
            
          </div>
          <p className="text-muted-foreground line-clamp-3">
          <SuspendedItem
        item={jobInfo}
        fallback={
          <Skeleton className="w-72"/>
        }
        result={j=> j.description}
        />
        </p>
        </header>
      <Link href={`/app/job-infos/${jobInfoId}/edit`}>
<Edit className="size-6"/>
      </Link>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 has-hover:*:not-hover:opacity-70">
        {options.map((option) => (
          <Link
            key={option.href}
            className="hover:scale-[1.02] transition-[transform_opacity]"
            href={`/app/job-infos/${jobInfoId}/${option.href}`}
          >
            <Card className="h-full flex items-start justify-between flex-row">
              <CardHeader className="flex-grow">
                <CardTitle className="text-lg">{option.label}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ArrowRightIcon className="size-6" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default JobInfoPage

async function getJobInfo(id :string , userId: string){
  "use cache"
  cacheTag(getJobInfoIdTag(id))
  await new Promise(resolve=>setTimeout(resolve,2000))
  return db.query.JobInfoTable.findFirst({
    where:and(eq(JobInfoTable.id ,id),eq(JobInfoTable.userId ,userId))  
  })
}

