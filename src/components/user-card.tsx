import Skeleton from "react-loading-skeleton"
import {
  Company as CompanyType,
  Contact as ContactType,
  UserListElement,
} from "../types/api-models"
import { ContainerProps } from "../types/util"
import { Anchor } from "./anchor"
import { ButtonStyledRouterLink } from "./buttons"

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

function UserCardContainer({ children }: ContainerProps) {
  return (
    <div className="grid border-2 border-default gap-4 p-8">{children}</div>
  )
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
      <ButtonStyledRouterLink to={`/user/${id}`} title={`${name} details`}>
        Details
      </ButtonStyledRouterLink>
    </UserCardContainer>
  )
}

function UserCardList({ users }: { users: UserListElement[] }) {
  if (users.length === 0) return <span>No users...</span>

  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
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
      {[...Array(10)].map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </>
  )
}

export { UserCardList, UserCardListSkeleton }
