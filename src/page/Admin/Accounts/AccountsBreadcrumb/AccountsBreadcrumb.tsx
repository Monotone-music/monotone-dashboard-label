import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AccountsBreadcrumbProps {
  stage1Title: string;
  stage1Link: string;
  stage2Title?: string;
  stage2Link?: string;
}

const AccountsBreadcrumb: React.FC<AccountsBreadcrumbProps> = ({
  stage1Link,
  stage1Title,
  stage2Link,
  stage2Title,
}) => {
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/label/accounts-management">
            Admin
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={stage1Link}>{stage1Title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={stage2Link}>{stage2Title}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AccountsBreadcrumb;
