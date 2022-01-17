import { ReactNode } from "react"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import {
  Company as CompanyType,
  Contact as ContactType,
  UserListElement,
} from "../types"
import { Anchor } from "./anchor"
import { Button } from "./buttons"

function CompanyInfo({ bs, catchPhrase, name }: CompanyType) {
  return (
    <div className="grid text-sm h-28 content-start">
      <span className="font-bold">{name}</span>
      <span className="text-sm trun">{catchPhrase}</span>
      <span className="font-bold text-sm">{bs}</span>
    </div>
  )
}

function Contact({ phone, website, email }: ContactType) {
  return (
    <div className="grid truncate">
      <Anchor href={`mailto:${email}`}>{email}</Anchor>
      <Anchor href={`tel:${phone}`}>{phone}</Anchor>
      <Anchor href={"https://" + website} target="_blank">
        {website}
      </Anchor>
    </div>
  )
}

function UserCardContainer({ children }: { children: ReactNode }) {
  return <div className="grid border-2 border-black gap-4 p-8">{children}</div>
}

function UserCard({
  id,
  name,
  company: companyProps,
  ...contactProps
}: UserListElement) {
  return (
    <UserCardContainer>
      <span className="font-extrabold text-lg">{name}</span>
      <Contact {...contactProps} />
      <CompanyInfo {...companyProps} />
      <Link to={`/user/${id}`} className="justify-self-center self-end">
        <Button variant="secondary">Details</Button>
      </Link>
    </UserCardContainer>
  )
}

function UserCardSkeleton() {
  return (
    <UserCardContainer>
      <Skeleton count={5} height={58} />
    </UserCardContainer>
  )
}

function UserCardListSkeleton() {
  return (
    <>
      {[...Array(10)].map(() => (
        <UserCardSkeleton />
      ))}
    </>
  )
}

export { UserCard, UserCardListSkeleton }
