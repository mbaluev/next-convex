import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { SvgLogo } from '@/components/svg/components/logo';
import { ROUTES } from '@/lib/settings/routes';

interface HeaderProps {
  label?: string;
  loading?: boolean;
}

export const WidgetHeaderContent = ({ label, loading }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Button variant="ghost" size="flex-start" className="text-3xl font-semibold" asChild>
        <Link href={ROUTES.HOME.path}>
          {loading ? (
            <Spinner className="text-2xl animate-spin" />
          ) : (
            <SvgLogo className="text-2xl" />
          )}
          {process.env.APP_NAME}
        </Link>
      </Button>
      {label && <p className="text-muted-foreground">{label}</p>}
    </div>
  );
};
