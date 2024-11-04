
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"


  interface AccountsBreadcrumbProps {
    stage1Title: string;
    stage1Link: string;
    stage2Title?: string;
    stage2Link?: string;
  }

const AccountsBreadcrumb:React.FC<AccountsBreadcrumbProps> = ({stage1Link, stage1Title, stage2Link, stage2Title}) => {
  return (
    <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/admin/accounts-management">Admin</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href={stage1Link}>{stage1Title}</BreadcrumbLink>
    </BreadcrumbItem>
    {/* <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem> */}
  </BreadcrumbList>
</Breadcrumb>
  )
}

export default AccountsBreadcrumb