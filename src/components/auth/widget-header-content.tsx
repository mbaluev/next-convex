import Link from 'next/link';
import { Spinner } from '@/components/atoms/spinner';
import { Button } from '@/components/atoms/button';
import { SvgLogo } from '@/components/svg/components/logo';
import { ROUTES } from '@/lib/settings/routes';

interface HeaderProps {
  label?: string;
  loading?: boolean;
}

export const WidgetHeaderContent = ({ label, loading }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col space-y-2 items-center justify-center">
      <Button variant="ghost" size="xl" asChild>
        <Link href={ROUTES.HOME.path}>
          {loading ? <Spinner className="animate-spin" /> : <SvgLogo />}
          {process.env.APP_NAME}
        </Link>
      </Button>
      {label && <p className="text-muted-foreground">{label}</p>}
    </div>
  );
};
